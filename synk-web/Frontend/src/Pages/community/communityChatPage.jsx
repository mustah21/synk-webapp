import { useParams } from 'react-router-dom';
import CommunityShell from '../../components/communityShell/communityShell';
import ChatWindow from '../../components/chat/chatWindow';

function CommunityChatPage() {
  const { publicId } = useParams();

  return (
    <CommunityShell activeTab="chat">
      <ChatWindow communityPublicId={publicId} fullHeight />
    </CommunityShell>
  );
}

export default CommunityChatPage;