import Image from 'next/image';
import Texting from './Texting';

interface MessageProps {
  isBot: boolean;
  isTexting: boolean | true;
  textMessage?: string;
}

const Message = ({ isBot, isTexting, textMessage }: MessageProps) => {
  return (
    <div
      className={`flex flex-row items-center ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && <Image src="/user.png" alt="Bot Avatar" width={48} height={48} className="mr-2" />}

      <div
        className={`px-4 py-2 m-3 message-radius inline-block shadow-sm ${isBot
          ? "bg-surfaceContainerHigh text-onSurfaceVariant"
          : "bg-secondary text-onSecondary"
          }`}
      >
        {isTexting ? <Texting /> : textMessage}
      </div>

      {!isBot && <Image src="/sender.png" alt="User Avatar" width={48} height={48} className="ml-2" />}
    </div>
  );
};

export default Message;