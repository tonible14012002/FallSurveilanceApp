import {useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {RTCPeerConnection, RTCSessionDescription} from 'react-native-webrtc';
import {io} from 'socket.io-client';

export function useVideoStreaming() {
  const room = '1';
  const user = {
    username: 'khoa',
  };
  const [localStream, setLocalStream] = useState(null);

  const route = useRoute();
  const {roomId} = route.params as {roomId: string};

  const socket = io('https://signaling-server-pfm2.onrender.com/', {
    transports: ['websocket'],
  });

  let pc: RTCPeerConnection;

  const signalingDataHandler = (data: any) => {
    if (data.type === 'answer') {
      console.log('pc.signalingState: ', pc.signalingState);
      if (pc.signalingState === 'have-local-offer') {
        const rtc_data = {
          type: data['type'],
          sdp: data['sdp'],
        };
        pc.setRemoteDescription(new RTCSessionDescription(rtc_data)).catch(
          error => console.error('Error setting remote description: ', error),
        );
      } else {
        console.log(
          'Cannot handle answer in current state: ',
          pc.signalingState,
        );
      }
    }
  };

  function negotiate() {
    pc.addTransceiver('video', {direction: 'recvonly'});
    pc.addTransceiver('audio', {direction: 'recvonly'});
    return pc
      .createOffer({})
      .then(offer => {
        return pc.setLocalDescription(offer);
      })
      .then(() => {
        // wait for ICE gathering to complete
        return new Promise(resolve => {
          if (pc.iceGatheringState === 'complete') {
            resolve(true);
          } else {
            const checkState = () => {
              if (pc.iceGatheringState === 'complete') {
                pc.removeEventListener('icegatheringstatechange', checkState);
                resolve(true);
              }
            };
            pc.addEventListener('icegatheringstatechange', checkState);
          }
        });
      })
      .then(() => {
        const offer = pc.localDescription as any;
        // send the offer to the signaling server
        socket.emit('offer', {
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

    pc = new RTCPeerConnection(config);

    pc.addEventListener('track', (evt: any) => {
      if (evt.track.kind === 'video') {
        console.log('hello, ', evt.streams[0]);
        setLocalStream(evt.streams[0]);
      }
    });

    negotiate();
  }

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

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

    // socket.on('connect_error', error => {
    //   console.error('Connection error: ', error);
    // });

    // socket.on('error', error => {
    //   console.error('An error occurred: ', error);
    // });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('offer');
      socket.off('answer');
      onDisconnect();
      // socket.off('connect_error');
      // socket.off('error');

      pc?.close();
    };
  }, [roomId]);

  return {localStream};
}
