import { useParams } from 'react-router-dom';
import CommunityShell from '../../components/CommunityShell/communityShell';
import ChatWindow from '../../components/Chat/ChatWindow';

function CommunityChatPage() {
  const { publicId } = useParams();

  return (
    <CommunityShell activeTab="chat">
      <ChatWindow communityPublicId={publicId} fullHeight />
    </CommunityShell>
  );
}

export default CommunityChatPage;