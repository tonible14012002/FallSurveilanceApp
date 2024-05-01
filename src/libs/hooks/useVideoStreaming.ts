import {useRef, useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

interface User {
  username?: string;
  // Add other user properties if needed
}

interface SendDataType {
  type: string;
  candidate?: RTCIceCandidate;
  // Add other data types if needed
}

export function useVideoStreaming() {
  const room = 1;
  const user = {
    username: 'khoa',
  };
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const socket = io('https://signaling-server-pfm2.onrender.com/', {
    transports: ['websocket'],
  });

  let pc: RTCPeerConnection; // For RTCPeerConnection Object

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
        console.log('Offer sent');
        console.log(offer);
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
        (localVideoRef.current as any).srcObject = evt.streams[0];
      }
    });

    negotiate();
  }

  // function stop() {
  //   document.getElementById('stop').style.display = 'none';

  //   // close peer connection
  //   setTimeout(() => {
  //     pc.close();
  //   }, 500);
  // }

  const startConnection = () => {
    try {
      socket.connect();
      socket.emit('join', {username: user.username, room: room});
      // start();
      console.log('Socket connection successful');
    } catch (error) {
      console.error('Socket connection failed: ', error);
    }
    // Listen for connection errors
  };

  const sendData = (data: any) => {
    // eslint-disable-next-line no-restricted-globals
    console.log('Sending data: ', data);
    socket.emit('data', {
      username: user.username,
      room: room,
      data: data,
    });
  };

  socket.on('offer', data => {
    console.log('Offer received');
    signalingDataHandler(data);
  });

  socket.on('answer', data => {
    console.log('Answer received');
    console.log(data);
    signalingDataHandler(data);
  });

  // useEffect(() => {
  //   startConnection();

  //   socket.on('connect_error', error => {
  //     console.error('Connection error: ', error);
  //   });

  //   // Listen for other errors
  //   socket.on('error', error => {
  //     console.error('An error occurred: ', error);
  //   });
  //   return () => {
  //     pc?.close();

  //     socket.off('connect_error');
  //     socket.off('error');
  //     socket.off('offer');
  //     socket.off('answer');
  //   };
  // }, []);

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

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

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return {localVideoRef, remoteVideoRef}; // Return only the startConnection function
}
