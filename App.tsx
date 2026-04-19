
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { MatchesView } from './components/MatchesView';
import { FieldsView } from './components/FieldsView';
import { RankingsView } from './components/RankingsView';
import { ChatView } from './components/ChatView';
import { ProfileView } from './components/ProfileView';
import { NotificationsView } from './components/NotificationsView';
import { ViewState, Field } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.MATCHES);
  const [pendingBooking, setPendingBooking] = useState<Field | null>(null);

  const handleBookField = (field: Field) => {
    setPendingBooking(field);
    setCurrentView(ViewState.MATCHES);
  };

  const handleClearBooking = () => {
    setPendingBooking(null);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.MATCHES:
        return <MatchesView pendingBooking={pendingBooking} onClearBooking={handleClearBooking} />;
      case ViewState.FIELDS:
        return <FieldsView onBook={handleBookField} />;
      case ViewState.RANKINGS:
        return <RankingsView />;
      case ViewState.CHAT:
        return <ChatView />;
      case ViewState.PROFILE:
        return <ProfileView />;
      case ViewState.NOTIFICATIONS:
        return <NotificationsView />;
      default:
        return <MatchesView />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
