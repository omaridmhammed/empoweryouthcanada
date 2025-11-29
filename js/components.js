// ========================================
// EMPOWER YOUTH CANADA - COMPONENTS
// Interactive Component Functions
// ========================================

// Modal System
class Modal {
    constructor(id) {
        this.id = id;
        this.overlay = null;
        this.modal = null;
    }

    create(title, content, footer = '') {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.overlay.id = this.id;

        // Create modal
        const modalHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        `;

        this.overlay.innerHTML = modalHTML;
        document.body.appendChild(this.overlay);

        // Add event listeners
        this.overlay.querySelector('.modal-close').addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Show modal
        setTimeout(() => this.overlay.classList.add('active'), 10);
    }

    close() {
        this.overlay.classList.remove('active');
        setTimeout(() => {
            this.overlay.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Program Detail Modals
function openProgramModal(programType) {
    const programs = {
        'education': {
            title: 'Education & Skills Training',
            content: `
                <h4 style="margin-bottom: 1rem; color: var(--color-primary-light);">Program Overview</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.7; color: var(--color-gray-light);">
                    Our Education & Skills Training programs prepare youth for success in the modern workforce through comprehensive digital literacy workshops, career development programs, and technical skills training.
                </p>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-primary-light);">What You'll Learn</h4>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 2; color: var(--color-gray-light);">
                    <li>Digital tools and software (Microsoft Office, Google Suite, Adobe Creative)</li>
                    <li>Resume building and interview preparation</li>
                    <li>Professional communication skills</li>
                    <li>Time management and organization</li>
                    <li>Industry-specific technical skills</li>
                </ul>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-primary-light);">Eligibility</h4>
                <p style="margin-bottom: 1.5rem; color: var(--color-gray-light);">Open to youth ages 16-30. No prerequisites required.</p>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-primary-light);">How to Join</h4>
                <p style="color: var(--color-gray-light);">Contact us at <a href="mailto:Info@EYC.ca" style="color: var(--color-primary-light);">Info@EYC.ca</a> or register at our events to learn more about upcoming workshops.</p>
            `
        },
        'employment': {
            title: 'Employment & Entrepreneurship',
            content: `
                <h4 style="margin-bottom: 1rem; color: var(--color-secondary-light);">Program Overview</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.7; color: var(--color-gray-light);">
                    Launch your career or start your business with our comprehensive employment and entrepreneurship support programs, including job matching, startup incubation, and business mentorship.
                </p>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-secondary-light);">Services Offered</h4>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 2; color: var(--color-gray-light);">
                    <li>Job placement assistance and career counseling</li>
                    <li>Startup incubation and business planning support</li>
                    <li>One-on-one mentorship with industry professionals</li>
                    <li>Networking events with employers and entrepreneurs</li>
                    <li>Funding opportunities and pitch competitions</li>
                </ul>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-secondary-light);">Success Stories</h4>
                <p style="color: var(--color-gray-light);">Our graduates have launched successful startups, secured employment at leading companies, and created positive change in their communities.</p>
            `
        },
        'mental-health': {
            title: 'Mental Health & Wellness',
            content: `
                <h4 style="margin-bottom: 1rem; color: var(--color-accent-light);">Program Overview</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.7; color: var(--color-gray-light);">
                    Your mental health matters. Access peer support groups, counseling services, and wellness programs in a safe, inclusive environment designed for youth wellbeing.
                </p>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-accent-light);">Available Support</h4>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 2; color: var(--color-gray-light);">
                    <li>Weekly peer support circles (confidential)</li>
                    <li>Access to licensed counselors and therapists</li>
                    <li>Mindfulness and wellness workshops</li>
                    <li>Crisis intervention and immediate support</li>
                    <li>Resource navigation and referrals</li>
                </ul>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-accent-light);">Confidentiality</h4>
                <p style="margin-bottom: 1.5rem; color: var(--color-gray-light);">All mental health services are confidential and provided in a judgement-free, supportive environment.</p>
                
                <div style="padding: 1rem; background: rgba(168, 85, 247, 0.1); border-radius: 0.5rem; border-left: 4px solid var(--color-accent);">
                    <p style="margin: 0; color: var(--color-white); font-weight: 600;">Crisis Support Available 24/7</p>
                    <p style="margin: 0.5rem 0 0 0; color: var(--color-gray-light); font-size: 0.9rem;">If you're in crisis, call 988 (Suicide Crisis Helpline) or 1-866-531-2600 (Kids Help Phone)</p>
                </div>
            `
        },
        'arts-sports': {
            title: 'Arts, Sports & Leadership',
            content: `
                <h4 style="margin-bottom: 1rem; color: var(--color-primary-light);">Program Overview</h4>
                <p style="margin-bottom: 1.5rem; line-height: 1.7; color: var(--color-gray-light);">
                    Express yourself, stay active, and develop leadership skills through our creative workshops, sports leagues, and leadership training programs.
                </p>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-primary-light);">Creative Programs</h4>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 2; color: var(--color-gray-light);">
                    <li>Visual arts workshops (painting, digital art, photography)</li>
                    <li>Music and performance programs</li>
                    <li>Creative writing and poetry</li>
                    <li>Film and media production</li>
                </ul>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-primary-light);">Sports & Recreation</h4>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 2; color: var(--color-gray-light);">
                    <li>Basketball, volleyball, and soccer leagues</li>
                    <li>Fitness and wellness activities</li>
                    <li>Outdoor adventures and team building</li>
                </ul>
                
                <h4 style="margin-bottom: 1rem; color: var(--color-primary-light);">Leadership Development</h4>
                <p style="color: var(--color-gray-light);">Build confidence, communication skills, and leadership abilities through workshops, mentorship, and hands-on projects.</p>
            `
        }
    };

    const program = programs[programType];
    if (program) {
        const modal = new Modal(`program-modal-${programType}`);
        modal.create(program.title, program.content);
    }
}

// RSVP Modal
function openRSVPModal(eventType) {
    const events = {
        'social-friday': {
            title: 'RSVP for Social Fridays',
            eventName: 'Social Fridays'
        },
        'fancy-weekend': {
            title: 'Get Tickets for Fancy Weekend',
            eventName: 'Fancy Weekend'
        }
    };

    const event = events[eventType];
    if (!event) return;

    const content = `
        <form id="rsvpForm" style="margin-top: 1rem;">
            <div class="form-group">
                <label for="rsvp-name" class="form-label">Full Name *</label>
                <input type="text" id="rsvp-name" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label for="rsvp-email" class="form-label">Email Address *</label>
                <input type="email" id="rsvp-email" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label for="rsvp-phone" class="form-label">Phone (optional)</label>
                <input type="tel" id="rsvp-phone" class="form-input">
            </div>
            
            <div class="form-group">
                <label for="rsvp-age" class="form-label">Age Range *</label>
                <select id="rsvp-age" class="form-select" required>
                    <option value="">Select age range</option>
                    <option value="16-18">16-18</option>
                    <option value="19-24">19-24</option>
                    <option value="25-30">25-30</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="rsvp-accommodations" class="form-label">Accessibility Needs</label>
                <textarea id="rsvp-accommodations" class="form-textarea" rows="3" placeholder="Let us know if you need any accommodations"></textarea>
            </div>
            
            <div class="form-group">
                <label style="display: flex; align-items: center; gap: 0.5rem; color: var(--color-gray-light); cursor: pointer;">
                    <input type="checkbox" id="rsvp-photos" class="form-checkbox">
                    <span>I consent to being photographed at this event</span>
                </label>
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-outline" onclick="document.getElementById('rsvp-modal').querySelector('.modal-close').click()">Cancel</button>
        <button class="btn btn-primary" onclick="submitRSVP('${eventType}')">Submit RSVP</button>
    `;

    const modal = new Modal('rsvp-modal');
    modal.create(event.title, content, footer);
}

function submitRSVP(eventType) {
    const form = document.getElementById('rsvpForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Simulate RSVP submission
    const modal = document.getElementById('rsvp-modal');
    modal.querySelector('.modal-close').click();

    showNotification('RSVP submitted successfully! Check your email for confirmation.', 'success');
}

// Volunteer Application Modal
function openVolunteerModal() {
    const content = `
        <form id="volunteerForm" style="margin-top: 1rem;">
            <div class="form-group">
                <label for="vol-name" class="form-label">Full Name *</label>
                <input type="text" id="vol-name" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label for="vol-email" class="form-label">Email Address *</label>
                <input type="email" id="vol-email" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label for="vol-phone" class="form-label">Phone Number *</label>
                <input type="tel" id="vol-phone" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label for="vol-interest" class="form-label">Area of Interest *</label>
                <select id="vol-interest" class="form-select" required>
                    <option value="">Select an area</option>
                    <option value="events">Event Support & Coordination</option>
                    <option value="mentorship">Youth Mentorship</option>
                    <option value="programs">Program Facilitation</option>
                    <option value="admin">Administrative Support</option>
                    <option value="marketing">Marketing & Communications</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="vol-availability" class="form-label">Availability</label>
                <textarea id="vol-availability" class="form-textarea" rows="3" placeholder="When are you available to volunteer?"></textarea>
            </div>
            
            <div class="form-group">
                <label for="vol-experience" class="form-label">Relevant Experience</label>
                <textarea id="vol-experience" class="form-textarea" rows="4" placeholder="Tell us about your relevant experience and skills"></textarea>
            </div>
        </form>
    `;

    const footer = `
        <button class="btn btn-outline" onclick="document.getElementById('volunteer-modal').querySelector('.modal-close').click()">Cancel</button>
        <button class="btn btn-primary" onclick="submitVolunteer()">Submit Application</button>
    `;

    const modal = new Modal('volunteer-modal');
    modal.create('Volunteer Application', content, footer);
}

function submitVolunteer() {
    const form = document.getElementById('volunteerForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const modal = document.getElementById('volunteer-modal');
    modal.querySelector('.modal-close').click();

    showNotification('Application submitted! We\'ll review and contact you soon.', 'success');
}

// Donate Modal
function openDonateModal() {
    const content = `
        <p style="margin-bottom: 1.5rem; color: var(--color-gray-light); line-height: 1.7;">
            Your generous contribution helps us provide free programs, resources, and opportunities to youth across Canada. Every dollar makes a difference.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
            <button class="btn btn-outline donation-amount" data-amount="25">$25</button>
            <button class="btn btn-outline donation-amount" data-amount="50">$50</button>
            <button class="btn btn-outline donation-amount" data-amount="100">$100</button>
            <button class="btn btn-outline donation-amount" data-amount="250">$250</button>
            <button class="btn btn-outline donation-amount" data-amount="500">$500</button>
            <button class="btn btn-outline donation-amount" data-amount="custom">Custom</button>
        </div>
        
        <div id="custom-amount" style="display: none; margin-bottom: 1.5rem;">
            <label for="donation-custom" class="form-label">Custom Amount</label>
            <input type="number" id="donation-custom" class="form-input" placeholder="Enter amount" min="1">
        </div>
        
        <div class="form-group">
            <label style="display: flex; align-items: center; gap: 0.5rem; color: var(--color-gray-light); cursor: pointer;">
                <input type="checkbox" id="recurring" class="form-checkbox">
                <span>Make this a monthly recurring donation</span>
            </label>
        </div>
        
        <p style="color: var(--color-gray); font-size: 0.875rem; margin-top: 1.5rem;">
            Note: This is a demonstration. For actual donations, please contact us at <a href="mailto:Admin@EYC.ca" style="color: var(--color-primary-light);">Admin@EYC.ca</a>
        </p>
    `;

    const footer = `
        <button class="btn btn-outline" onclick="document.getElementById('donate-modal').querySelector('.modal-close').click()">Cancel</button>
        <button class="btn btn-primary" onclick="processDonation()">Proceed to Payment</button>
    `;

    const modal = new Modal('donate-modal');
    modal.create('Support Our Work', content, footer);

    // Add event listeners for donation amounts
    setTimeout(() => {
        document.querySelectorAll('.donation-amount').forEach(btn => {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.donation-amount').forEach(b => b.classList.remove('btn-primary'));
                this.classList.add('btn-primary');

                const customDiv = document.getElementById('custom-amount');
                if (this.dataset.amount === 'custom') {
                    customDiv.style.display = 'block';
                } else {
                    customDiv.style.display = 'none';
                }
            });
        });
    }, 100);
}

function processDonation() {
    const modal = document.getElementById('donate-modal');
    modal.querySelector('.modal-close').click();
    showNotification('Please contact Admin@EYC.ca to complete your donation. Thank you for your support!', 'info');
}

// Membership Modal
function openMembershipModal() {
    const content = `
        <p style="margin-bottom: 1.5rem; color: var(--color-gray-light); line-height: 1.7;">
            Join Empower Youth Canada as a member to access exclusive programs, networking events, and leadership opportunities.
        </p>
        
        <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
            <div class="card" style="padding: 1.5rem; cursor: pointer; transition: all 0.3s;" onclick="selectMembership('youth')">
                <h4 style="margin-bottom: 0.5rem; color: var(--color-primary-light);">Youth Member (FREE)</h4>
                <p style="color: var(--color-gray-light); font-size: 0.9rem;">Ages 16-30 • Access to all programs and events</p>
            </div>
            
            <div class="card" style="padding: 1.5rem; cursor: pointer; transition: all 0.3s;" onclick="selectMembership('mentor')">
                <h4 style="margin-bottom: 0.5rem; color: var(--color-secondary-light);">Mentor Member ($50/year)</h4>
                <p style="color: var(--color-gray-light); font-size: 0.9rem;">30+ • Give back through mentorship and support</p>
            </div>
        </div>
    `;

    const modal = new Modal('membership-modal');
    modal.create('Become a Member', content);
}

function selectMembership(type) {
    const modal = document.getElementById('membership-modal');
    modal.querySelector('.modal-close').click();

    const message = type === 'youth'
        ? 'To register as a Youth Member, please contact Info@EYC.ca or visit us at our next event!'
        : 'To become a Mentor Member, please contact Admin@EYC.ca for registration details.';

    showNotification(message, 'info');
}

// Utility function for notification (imported from main.js)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
