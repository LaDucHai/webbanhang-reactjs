import React, { memo, useState, useMemo, useEffect, useRef } from 'react';
import './styles.css';

import axios from 'axios';
import { io } from 'socket.io-client';

import { reduxStore } from '../../../utils/redux';
import { SERVERADDRESS, TOKEN, TOKENENCODESTRING, USERINFOR, SERVERSOCKET } from '../../../utils/Constant';
import MiniInboxBox from './MiniInboxBox';


/**
*@typedef {
*ChatRomms_Id?: string,
*ChatRooms_User1_Id: string,
*ChatRooms_User2_Id: string
*} ChatRoomsOptions
*/


// in here, the main is help between receiver and sender having roomid (in database)
// they will join roomid (in database) on socket-server in the next (in component MiniInboxBox) 
const MiniInboxContainer = () => {
    // note: every-one will join into a roomid with their socketid, 
    // this room help them to have roomid (in database) in the receiver role, 
    // and it save in chatRoomsId.
    // the sender role, user will have a roomid in database when user send a inbox require.
    // the receiver role, user will listen a inbox require on room(socketid), 
    // then user will receive a roomid in database, then user will decide to talk or not
    const [chatRoomsId, setChatRoomsId] = useState([]);

    // the receiver role, user will transfer back-ground mode, receive message will store into queue variable
    // user will chat directly (in component MiniInboxBox) 
    const messageQueue = useRef([]);


    // this socket support setup
    // sender and receiver have a common roomid (in database) via socket nay
    // and this socket support to receive message in back-groud mode
    const socket = io(SERVERSOCKET, {
        auth: {
            token: `${TOKENENCODESTRING} ${TOKEN}`
        },
        query: {
            userId: USERINFOR.User_Id
        }
    });


    // in list function to get roomid in database if user in the sender role
    const getChatRoom = (chatRoomsOptions) => {
        return new Promise((resolve, reject) => {
            axios({ 
                method: 'get',
                url: `${SERVERADDRESS}/chat?type=getChatRoom&userId1=${chatRoomsOptions.ChatRooms_User1_Id}&userId2=${chatRoomsOptions.ChatRooms_User2_Id}`,
                headers: {
                    Authorization: `${TOKENENCODESTRING} ${TOKEN}`
                }
            }).then(function (res) {
                resolve(res.data);
                // console.log(res.data.data.recordset[0]);
            }).catch(err => {
                reject(err);
            });
        })
    }
    const addChatRoom = (chatRoomsOptions) => {
        return new Promise((resolve, reject) => {
            axios({ 
                method: 'get',
                url: `${SERVERADDRESS}/chat?type=addChatRoom&userId1=${chatRoomsOptions.ChatRooms_User1_Id}&userId2=${chatRoomsOptions.ChatRooms_User2_Id}`,
                headers: {
                    Authorization: `${TOKENENCODESTRING} ${TOKEN}`
                }
            }).then(function (res) {
                resolve(res.data.data.ChatRomms_Id)
            }).catch(err => {
                reject(err);
            });
        })
    }
    const setupChat = () => {
        return new Promise((resolve, reject) => {
            resolve();
        })
    }
    ///////////////////////

    useMemo(() => {
        // a action on sender: require inbox via reduxStore, or where-every
        reduxStore.subscribe(() => {
            if (reduxStore.getState().type === 'requireInbox') {
                let chatRoomsOptions = {
                    chatRomms_Id: '',
                    ChatRooms_User1_Id: reduxStore.getState().data.sender,
                    ChatRooms_User2_Id: reduxStore.getState().data.receiver
                }
                setupChat().then(() => {
                    // console.log('setupChat')
                    return getChatRoom(chatRoomsOptions);
                }).then((res) => {
                    // console.log('setupChat', res.data.rowsAffected[0])
                    if (res.state) {
                        if (res.data.rowsAffected[0] > 0) {
                            return res.data.recordset[0].ChatRomms_Id;
                        } else {
                            return addChatRoom(chatRoomsOptions);
                        }
                    }
                }).then(chatRooms_Id_inDatabase => {
                    // console.log(chatRooms_Id)
                    if (!chatRoomsId.includes(chatRooms_Id_inDatabase)) {
                        setChatRoomsId(pre => {
                            return [...pre, chatRooms_Id_inDatabase]
                        })

                        // the sender role, user will send a inbox require to receiver
                        socket.emit('sender-receiver-inboxRequire', {
                            // chatRooms_Id_inDatabase to send to receiver
                            chatRooms_Id_inDatabase: chatRooms_Id_inDatabase, 
                            // server use it to get receiver'roomid (is a socketid) in redis to send require via this room
                            receiverId: reduxStore.getState().data.receiver, 
                        }); 
                        // console.log('sender-receiver-inboxRequire', 'chatRooms_Id_inDatabase', chatRooms_Id_inDatabase)
                    }
                }).catch(err => console.error(err))
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // everyone will join 1 room with their socketid
    useEffect(() => {
        socket.on('connect', () => {
            // console.log('MiniInboxContainer', 'socket.id', socket.id)
            // the receiver role then socket connected, user listen a inbox require from sender, 
            // here user will decide join a roomid (in database) or wait.
            // at once, user send a online notification 
            socket.on('sender-receiver-inboxRequire', chatRooms_Id_inDatabase => {
                // console.log('MiniInboxContainer', 'sender-receiver-inboxRequire', 'chatRooms_Id_inDatabase', chatRooms_Id_inDatabase)
                // in the receiver role, if user is actived to chat directly, they transfer back-groud
                // here, message is stored in messageQueue and transfer to notification
                // this message will be received precarious via this socket until receiver accept to roomid (in database) (in component MiniInboxBox) 
                // in component MiniInboxBox, between sender and receiver create a new socket to join a roomid (in database)
                // now, let join precarious a roomid (in database) with this socket
                // note: server send this event via receiver socketid to receiver, so
                // this socket only join roomId (in database) with the receiver role
                socket.emit('user-join-roomId-inDatabase', chatRooms_Id_inDatabase)
            })

            // event on the receiver role
            // sender will send check message that receiver is online or offline
            // receiver responsive to sender in here if online
            // because this socket only join roomId (in database) with the receiver role, 
            // only receiver listen this event (because  this event is sent via roomId in database)
            socket.on('check-inboxUser-online-offline', (senderId, chatRooms_Id_inDatabase) => {
                // responsive message
                // use condition is unnecessary, we write it to be more explicit, that 
                // responsive activation is implement by the other user
                if (USERINFOR.User_Id !== senderId) {
                    socket.emit('responsive-check-inboxUser-online-offline', {
                        senderId: USERINFOR.User_Id, 
                        chatRooms_Id_inDatabase: chatRooms_Id_inDatabase
                    })
                }
            })

            // in the receiver role with back-ground mode, user will receive message in here,
            // and user implement a update notification 
            socket.on('message-roomId-inDatabase', message => {
                messageQueue.current = [...messageQueue.current, message]
                console.log('message-roomId-inDatabase', messageQueue.current)
            })

            socket.io.on("error", (error) => {
                console.error(error);
            })

            socket.on("disconnect", () => {
                console.log('socket disconnect')
            })
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let miniInboxBoxs = chatRoomsId.map((data, index) => {
        return (
            <div key={index}>   
                <MiniInboxBox index={index} onChatRoomId={data} />
            </div>
        )
    })

    return (
        <div className="MiniInboxContainer">
            {miniInboxBoxs}
        </div>
    )
}

export default memo(MiniInboxContainer);