const tabItems = [
  {
    key: 'current',
    label: (
      <span className="tab-label">
        Current Auctions
        <span className="count-badge">{currentAuctions.length}</span>
      </span>
    ),
    children: <CurrentAuctionsList auctions={currentAuctions} />
  },
  {
    key: 'past',
    label: (
      <span className="tab-label">
        Past Auctions
        <span className="count-badge">{pastAuctions.length}</span>
      </span>
    ),
    children: <PastAuctionsList auctions={pastAuctions} />
  }
];

<Tabs defaultActiveKey="current" items={tabItems} /> 