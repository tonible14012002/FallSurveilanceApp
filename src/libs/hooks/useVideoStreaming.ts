import {useRoute} from '@react-navigation/native';
import {useEffect, useState, useRef} from 'react';
import {RTCPeerConnection, RTCSessionDescription} from 'react-native-webrtc';
import {io} from 'socket.io-client';

export function useVideoStreaming() {
  const room = '1';
  const user = {
    username: 'khoa',
  };
  const [localStream, setLocalStream] = useState(null);

  const route = useRoute();
  const {deviceId} = route.params as {deviceId: string};

  const socketRef = useRef(
    io('https://signaling-server-pfm2.onrender.com/', {
      transports: ['websocket'],
    }),
  );
  const pcRef = useRef<RTCPeerConnection>();

  const signalingDataHandler = (data: any) => {
    if (data.type === 'answer') {
      console.log('pc.signalingState: ', pcRef.current?.signalingState);
      if (pcRef.current?.signalingState === 'have-local-offer') {
        const rtc_data = {
          type: data.type,
          sdp: data.sdp,
        };
        pcRef.current
          ?.setRemoteDescription(new RTCSessionDescription(rtc_data))
          .catch(error =>
            console.error('Error setting remote description: ', error),
          );
      } else {
        console.log(
          'Cannot handle answer in current state: ',
          pcRef.current?.signalingState,
        );
      }
    }
  };

  function negotiate() {
    pcRef.current?.addTransceiver('video', {direction: 'recvonly'});
    pcRef.current?.addTransceiver('audio', {direction: 'recvonly'});
    return pcRef.current
      ?.createOffer({})
      .then(offer => {
        return pcRef.current?.setLocalDescription(offer);
      })
      .then(() => {
        // wait for ICE gathering to complete
        return new Promise(resolve => {
          if (pcRef.current?.iceGatheringState === 'complete') {
            resolve(true);
          } else {
            const checkState = () => {
              if (pcRef.current?.iceGatheringState === 'complete') {
                pcRef.current?.removeEventListener(
                  'icegatheringstatechange',
                  checkState,
                );
                resolve(true);
              }
            };
            pcRef.current?.addEventListener(
              'icegatheringstatechange',
              checkState,
            );
          }
        });
      })
      .then(() => {
        const offer = pcRef.current?.localDescription as RTCSessionDescription;
        // send the offer to the signaling server
        socketRef.current.emit('offer', {
          sdp: offer.sdp,
          type: offer.type,
          username: user.username,
          room: room,
        });
      })
      .catch(e => {
        console.log('Error negotiate, ', e);
      });
  }

  function start() {
    const config = {
      sdpSemantics: 'unified-plan',
      iceServers: [] as any,
    };

    config.iceServers = [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ];

    pcRef.current = new RTCPeerConnection(config);

    pcRef.current.addEventListener('track', (evt: any) => {
      if (evt.track.kind === 'video') {
        console.log('hello, ', evt.streams[0]);
        setLocalStream(evt.streams[0]);
      }
    });

    negotiate();
  }

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  const disconnect = () => {};

  useEffect(() => {
    if (!deviceId) {
      return;
    }

    const socket = socketRef.current;
    const pc = pcRef.current;

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.emit('join', {username: user.username, room: room});
      start();
      socket.io.engine.on('upgrade', transport => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    if (socket.active) {
      onConnect();
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('offer', data => {
      console.log('Offer received');
      signalingDataHandler(data);
    });

    socket.on('answer', data => {
      console.log('Answer received');
      signalingDataHandler(data);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('offer');
      socket.off('answer');
      onDisconnect();
      socket.disconnect(); // Manually disconnect the socket
      pc?.close(); // Manually close the RTCPeerConnection
      socketRef.current.disconnect();
      pcRef.current?.close();
    };
  }, [deviceId]);

  return {localStream};
}
