document.addEventListener('DOMContentLoaded', async () => {
    const announcementsContainer = document.getElementById('announcements-container');
    if (!announcementsContainer) return;

    try {
        const response = await fetch('../../announcements.json');
        const announcements = await response.json();

        announcements.forEach(announcement => {
            const announcementDiv = document.createElement('div');
            announcementDiv.classList.add('announcement-item');
            announcementDiv.innerHTML = `
                <h3>${announcement.title}</h3>
                <p class="announcement-date">${announcement.date}</p>
                <p>${announcement.content}</p>
            `;
            announcementsContainer.appendChild(announcementDiv);
        });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        announcementsContainer.innerHTML = '<p>Failed to load announcements. Please try again later.</p>';
    }
});
