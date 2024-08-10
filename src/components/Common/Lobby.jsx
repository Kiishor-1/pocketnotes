import NoChatBG from '../../assets/img/noChatBg.png';
import { IoMdLock } from 'react-icons/io';

export default function Lobby() {
    return (
        <>
            <img src={NoChatBG} alt="" className="w-[400px]" />
            <h1 className="text-4xl font-semibold">Pocket Notes</h1>
            <p className="w-[650px] leading-[32px] text-[22px] h-[65px] font-[500]">
                Send and receive messages without keeping your phone online.
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <p className="absolute bottom-[1rem] flex items-center">
                <IoMdLock />
                end-to-end encrypted
            </p>
        </>
    )
}
