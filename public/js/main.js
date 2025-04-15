fetch('assets/data/data.json')
  .then(res => res.json())
  .then(data => {
    const path = window.location.pathname;
    const isIndex = path.includes("index.html") || path.endsWith("/");
    const isTicket = path.includes("ticket.html");

    // Sidebar
    const sidebarNav = document.getElementById("sidebarNav");
    const sidebarKeys = [
      "overview_text", "tickets_text", "ideas_text", "contacts_text",
      "agents_text", "articles_text", "settings_text", "subscription_text"
    ];
    const linkMap = {
      "overview_text": "index.html",
      "tickets_text": "ticket.html"
    };
    const activeKey = isIndex ? "overview_text" : isTicket ? "tickets_text" : "";

    sidebarKeys.forEach((key, index) => {
      const label = data.sidebar?.[key];
      const href = linkMap[key] || "#";
      const isActive = key === activeKey ? "active" : "";

      if (label) {
        if (key === "settings_text") {
          sidebarNav.innerHTML += `<hr style="border: none; border-top: 1px solid #e0e4ec; margin: 20px 0;" />`;
        }

        sidebarNav.innerHTML += `
          <a href="${href}" class="sidebar-nav-item ${isActive}">${label}</a>
        `;
      }
    });

    // index.html
    if (isIndex) {
      // Card 4
      const topCardContainer = document.getElementById("topCardContainer");
      const topCardKeys = ["unresolved", "overdue", "open", "onHold"];
      topCardKeys.forEach(baseKey => {
        const item = data.overview.find(o => o[`${baseKey}_text`]);
        if (item) {
          const text = item[`${baseKey}_text`];
          const value = item[`${baseKey}_value`];
          topCardContainer.innerHTML += `
            <div class="card-box">
              <h6>${text}</h6>
              <h2>${value}</h2>
            </div>
          `;
        }
      });

      // Overview card (Right side)
      const overviewPanel = document.getElementById("overviewPanel");
      const overviewKeys = [
        "resoulved", "received",
        "averageFirstResponseTime", "averageResponseTime", "resolutionWithinSla"
      ];
      overviewKeys.forEach(baseKey => {
        const item = data.overview.find(o => o[`${baseKey}_text`]);
        if (item) {
          const text = item[`${baseKey}_text`];
          const value = item[`${baseKey}_value`];
          overviewPanel.innerHTML += `
            <div class="overview-item">
              <h6>${text}</h6>
              <h3>${value}</h3>
            </div>
          `;
        }
      });

      // ticket table
      const ticketTable = document.getElementById("ticketTableRows");
      const ticketKeys = [
        "featureRequest",
        "awaitingCusomerResponse",
        "awaitingDeveloperFix",
        "pending"
      ];
      ticketKeys.forEach(baseKey => {
        const item = data.overview.find(o => o[`${baseKey}_text`]);
        if (item) {
          const label = item[`${baseKey}_text`];
          const value = item[`${baseKey}_value`];
          ticketTable.innerHTML += `
            <div class="ticket-row">
              <div class="ticket-label">${label}</div>
              <div class="ticket-value">${value}</div>
            </div>
          `;
        }
      });
    }

    // ticket.html
    if (isTicket) {
      const ticketList = document.getElementById("ticketList");
      data.tickets.forEach(ticket => {
        ticketList.innerHTML += `
          <div class="ticket-item">
            <div class="ticket-col detail">
              <img class="ticket-avatar" src="${ticket.avatar}" alt="${ticket.customer}" />
              <div class="ticket-text">
                <div class="title">${ticket.title}</div>
                <div class="update">${ticket.updated}</div>
              </div>
            </div>
            <div class="ticket-col customer">${ticket.customer}</div>
            <div class="ticket-col date">
              ${ticket.date}<br /><small>${ticket.time}</small>
            </div>
            <div class="ticket-col priority">
              <span class="badge ${ticket.priority}">${ticket.priority}</span>
            </div>
          </div>
        `;
      });
    }
  })

