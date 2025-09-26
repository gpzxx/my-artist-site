document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    en: {
      nav: {
        toggle: 'Toggle navigation',
        biography: 'Biography',
        media: 'Media',
        releases: 'Releases',
        booking: 'Booking',
      },
      lang: {
        toggleLabel: 'Language selection',
        switchToEnglish: 'Switch to English',
        switchToGerman: 'Switch to German',
      },
      footer: {
        legal: 'Legal Notice',
        privacy: 'Privacy Policy',
      },
      home: {
        metaTitle: 'KIZU - Portfolio',
        metaDescription: 'Official artist portfolio: bio, media, and bookings',
        intro: {
          eyebrow: 'Producer & DJ',
          heading: 'Immersive club journeys built on uplifting melodies and driving beats.',
          body: 'Ravensburg-based artist shaping trance, speed garage, and hard house textures into high-intensity live sets and mindful listening experiences.',
          ctaPrimary: 'Request a Booking',
          ctaSecondary: 'Listen to Releases',
          tagsLabel: 'Sounds and moods',
          tag1: 'Trance',
          tag2: 'Speed Garage',
          tag3: 'Hard House',
        },
        spotlight: {
          story: {
            label: 'Story',
            heading: 'Biography',
            copy: 'Origins, influences, and little stories about myself',
            link: 'Explore →',
          },
          visuals: {
            label: 'Visuals',
            heading: 'Media',
            copy: 'High contrast imagery and live captures',
            link: 'View →',
          },
          catalogue: {
            label: 'Catalogue',
            heading: 'Releases',
            copy: 'Singles and mixes curated for late-night momentum.',
            link: 'Listen →',
          },
        },
        pulse: {
          eyebrow: 'Signature vibe',
          heading: 'Club energy with heart.',
          body: 'My sets move from deep thriving raw techno/groove basslines into euphoric trance breakdowns, layering hard house and a lot of love for the crowd. Every show is a journey and definitely unique.',
          listLabel: 'Sound DNA',
          sound: {
            term: 'Sound',
            desc: 'Speed garage, trance, hard house and acid lines built for goosebumps.',
          },
          vibe: {
            term: 'Vibe',
            desc: 'High-energy rave, warm transitions and deep melodies to catch you off-guard turning fast into bass-face mode',
          },
          mission: {
            term: 'Mission',
            desc: 'Create a community. On the dancefloor, also for the living-rooms.',
          },
          ctaMedia: 'View media',
          ctaReleases: 'Latest releases',
          imageAlt: 'KIZU during a club set bathed in purple light',
          overlay: 'Rave safe, rave loud.',
        },
      },
      bio: {
        metaTitle: 'KIZU - Biography',
        header: {
          title: 'Biography',
          lead: 'Kizu is a young, versatile artist whose mission is to make people laugh, move them emotionally, and bring the ecstatic power of electronic music to the dance floor.',
        },
        media: {
          alt: 'Portrait',
        },
        about: {
          title: 'About',
          p1: 'Based in Ravensburg, Germany, Kizu channels a warm, welcoming vibe and always goes the extra mile for the music and the crowd. On stage, he delivers energetic, feel-good DJ sets that fuse fast-paced groove and trance with flashes of bliss.',
          p2: 'He began making music in late 2023 and stepped into production in late 2024, quickly shaping a confident, high-energy sound. Bookings span clubs and residencies including Hans-Bunte-Areal (Freiburg) and Club Douala (Ravensburg), with appearances at Circle (Offenburg) & //:about Blank (Berlin)',
          p3: 'Releases and signings touch labels such as Para//e/ (Berlin), SYNTHX Records (Munich), Milli Records (Berlin), and SeshDawgsUnited (Berlin)',
          p4: 'Always spread love and you will receive love.',
        },
        highlights: {
          title: 'Highlights',
          item1: 'Festival appearances',
          item2: 'Label releases',
          festivalModal: {
            title: 'Festival appearances',
            intro: 'Snapshots from standout festival slots.',
            list: '<li>Hart bis Zart Festival - Freiburg (2024)</li><li>Hart bis Zart Festival - Freiburg (2025)</li><li>Backyard77 - Offenburg (2025)</li>',
            close: 'Close',
          },
        },
        contact: {
          title: 'Contact & Bookings',
          body: 'Email: <a href="mailto:bookings@kizuloge.com">bookings@kizuloge.com</a>',
        },
        stats: {
          label: 'Career highlights',
          valueYears: '2',
          labelYears: 'Years DJing',
          valueReleases: '9',
          labelReleases: 'Releases out',
          valueClubs: '7',
          labelClubs: 'Clubs played',
          clubsModal: {
            title: 'Clubs played',
            intro: 'Stages I have performed at so far:',
            list: '<li>Hans-Bunte-Areal - Freiburg</li><li>Club Douala - Ravensburg</li><li>Circle - Offenburg</li><li>//:about blank - Berlin</li><li>Bahnwärter Thiel - München</li><li>Gleis44 - Ulm</li><li>TheGreatRängTäng - Freiburg</li>',
            close: 'Close',
          },
        },
      },
      media: {
        metaTitle: 'KIZU - Photos & Videos',
        header: {
          title: 'Photos & Videos',
          lead: 'Front-row footage from the booth, plus the stills that set the mood.',
        },
        videos: {
          eyebrow: 'Live energy',
          title: 'DJ sets in motion',
          lead: 'The booth, the lights, the crowd — watch the energy unfold.',
          playLabel: 'Play video',
          playCta: 'Play video',
        },
        photos: {
          eyebrow: 'Still moments',
          title: 'Photo highlights',
          lead: 'Soft-focus frames that sit behind the music.',
        },
        slider: {
          prev: 'Previous image',
          img1: 'Live show',
          img2: 'Studio session',
          img3: 'Portrait',
          next: 'Next image',
        },
        lightbox: {
          close: 'Close',
          alt: 'Expanded media',
        },
      },
      releases: {
        metaTitle: 'KIZU - Releases',
        header: {
          title: 'Releases',
          lead: 'Tracks, mixes and highlights in my career to explore.',
        },
        filters: {
          all: 'All',
          tracks: 'Tracks',
          mixes: 'Mixes',
          labels: 'Labels',
        },
        hbyl: {
          frontLabel: 'Show release details for Haunted By Your Love',
          coverAlt: 'Haunted By Your Love cover art',
          desc: 'Super melancholic summer anthem.',
        },
        actions: {
          back: 'Back to cover',
        },
        badges: {
          track: 'Track',
          mix: 'Mixes',
        },
        listenLabel: 'Listen',
        outtaspace: {
          frontLabel: 'Show release details for Outta Space',
          coverAlt: 'Outta Space cover art',
          desc: 'We just love acid.',
        },
        foundyou: {
          frontLabel: 'Show release details for Found You',
          coverAlt: 'Found You cover art',
          desc: 'Your next favorite closing track.',
        },
        blowakiss: {
          frontLabel: 'Show release details for Blow A Kiss',
          coverAlt: 'Blow A Kiss cover art',
          desc: 'Super driving headbanger.',
        },
        mixes: {
          title: 'All Mixes Playlist',
          note: 'Hit play to run through every uploaded mix in one go.',
        },
        labels: {
          title: 'Label Highlights',
          parallel: 'Parallel Label',
          parallelAlt: 'Parallel Label',
          synthx: 'Synthx Records',
          synthxAlt: 'Synthx Records',
          coming: 'Coming Soon',
          milliAlt: 'Milli Records',
        },
      },
      booking: {
        metaTitle: 'KIZU - Booking',
        header: {
          title: 'Technical & Hospitality Rider',
          lead: 'Download or view the latest PDF rider below.',
          primaryCta: 'Request a Booking',
          download: 'Download Rider',
          open: 'Open in new tab',
        },
        rider: {
          title: 'KIZU technical rider',
          fallback: 'PDF preview unavailable? <a href="../assets/docs/KIZU_Rider.pdf">Download the rider</a>.',
        },
        form: {
          title: 'Contact Form',
          lead: 'Send your request directly via the form or use the email address. After submitting, your mail app opens so you can add attachments before sending.',
          name: 'Name *',
          email: 'Email *',
          subject: 'Subject',
          subjectPlaceholder: 'Booking, press, general request...',
          message: 'Message *',
          messagePlaceholder: 'How can we help?',
          privacy: 'I have read the <a href="../impressum/">legal notice</a> and agree that my details may be processed to reply to my inquiry.',
          submit: 'Send Message',
          disclaimer: 'The form opens your email program so you can review and send the message. No data is stored on this server.',
        },
      },
      imprint: {
        metaTitle: 'KIZU - Legal Notice',
        metaDescription: 'Legal notice and regulatory information for the official portfolio of KIZU.',
        header: `
          <h1>Legal Notice</h1>
          <p>Information pursuant to Section 5 TMG and Section 55 RStV.</p>
        `,
        sectionInfo: `
          <h2>Information pursuant to Section 5 TMG</h2>
          <address>
            <strong>Andrei Moldovan</strong><br />
            DJ / Producer<br />
            Wilhelmstrasse 14<br />
            88250 Weingarten<br />
            Germany
          </address>
        `,
        sectionContact: `
          <h2>Contact</h2>
          <p>Phone: <a href="tel:+4917632817822">+49 (0) 176 328 17822</a><br />
          Email: <a href="mailto:info@kizuloge.com">info@kizuloge.com</a></p>
          <p>You can also use the <a href="../booking/#contact-form">contact form</a> on the booking page.</p>
        `,
        sectionDispute: `
          <h2>Consumer dispute resolution</h2>
          <p>We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
          <p>Source: <a href="https://www.e-recht24.de" rel="noopener" target="_blank">e-recht24.de</a></p>
        `,
        sectionContent: `
          <h2>Liability for content</h2>
          <p>As a service provider we are responsible for our own content on these pages in accordance with Section 7 paragraph 1 TMG and general legislation. According to Sections 8 to 10 TMG, we are however not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate unlawful activity.</p>
          <p>Obligations to remove or block the use of information under general legislation remain unaffected. Liability in this respect is however only possible from the time we become aware of a specific infringement. If we become aware of any such legal violations, we will remove the relevant content immediately.</p>
        `,
        sectionLinks: `
          <h2>Liability for links</h2>
          <p>Our offer contains links to external third-party websites over whose content we have no influence. Therefore we cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for the content of the pages. Unlawful content was not recognisable at the time the link was created.</p>
          <p>Permanent monitoring of the content of the linked pages is however unreasonable without concrete evidence of a violation of the law. If we become aware of any legal infringements, we will remove such links immediately.</p>
        `,
        sectionCopyright: `
          <h2>Copyright</h2>
          <p>The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution and any kind of utilisation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.</p>
          <p>Where the content on this page was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. As soon as we become aware of legal violations, we will remove such content immediately.</p>
        `,
        sectionOdr: `
          <h2>Online dispute resolution</h2>
          <p>The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr" rel="noopener" target="_blank">https://ec.europa.eu/consumers/odr</a>. You can find our email address above in this legal notice.</p>
        `,
      },
      privacy: {
        metaTitle: 'KIZU - Privacy Policy',
        metaDescription: 'Privacy information about how personal data is processed on the official KIZU website.',
        header: `
          <h1>Privacy Policy</h1>
          <p>Information in accordance with Article 13 GDPR on how we handle personal data.</p>
        `,
        section1: `
          <h2>1. Data protection at a glance</h2>
          <h3>General information</h3>
          <p>The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to identify you personally. Detailed information on the subject of data protection can be found in the full privacy policy below.</p>
          <h3>Data collection on this website</h3>
          <h4>Who is responsible for data collection on this website?</h4>
          <p>Data processing on this website is carried out by the website operator. You can find the operator's contact details in the section "Responsible party" within this privacy policy.</p>
          <h4>How do we collect your data?</h4>
          <p>On the one hand, your data is collected when you communicate it to us. This may, for example, be data that you enter in a contact form.</p>
          <p>Other data is collected automatically or after your consent when you visit the website. This is primarily technical data (for example the browser and operating system used or the time the page was accessed). This data is collected automatically as soon as you enter this website.</p>
          <h4>What do we use your data for?</h4>
          <p>Part of the data is collected to ensure error-free provision of the website. Other data may be used to analyse your user behaviour. Where the website can be used to initiate or conclude contracts, transmitted data will also be processed for offers, orders or other requests.</p>
          <h4>What rights do you have regarding your data?</h4>
          <p>You have the right at any time to obtain free information about the origin, recipient and purpose of your stored personal data. You also have the right to request the rectification or erasure of this data. If you have given consent to data processing, you may withdraw that consent at any time with effect for the future. Furthermore, you have the right to request restriction of the processing of your personal data under certain circumstances. You also have a right to lodge a complaint with the competent supervisory authority.</p>
          <p>You can contact us at any time regarding these rights and any other questions on the subject of data protection.</p>
        `,
        section2: `
          <h2>2. General information and mandatory details</h2>
          <h3>Data protection</h3>
          <p>The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.</p>
          <p>When you use this website, various personal data will be collected. Personal data is data that can be used to identify you personally. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this happens.</p>
          <p>We would like to point out that data transmission on the Internet (for example when communicating by email) can have security gaps. Complete protection of data against access by third parties is not possible.</p>
          <h3>Responsible party</h3>
          <p>The responsible party for data processing on this website is:</p>
          <p>KIZU Productions<br />
          Wilhelmstrasse 14<br />
          88250 Weingarten<br />
          Germany</p>
          <p>Phone: <a href="tel:+4917632817822">+49 (0) 176 328 17822</a><br />
          Email: <a href="mailto:info@kizuloge.com">info@kizuloge.com</a></p>
          <p>The responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of the processing of personal data (such as names, email addresses or similar).</p>
          <h3>Storage period</h3>
          <p>Unless a more specific storage period has been specified in this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for erasure or withdraw your consent to data processing, your data will be erased unless we have other legally permissible reasons for storing your personal data (for example tax or commercial retention periods); in the latter case the data will be erased once these reasons no longer apply.</p>
          <h3>General information on the legal basis for data processing on this website</h3>
          <p>If you have consented to data processing, we process your personal data on the basis of Article 6 paragraph 1 letter a GDPR or Article 9 paragraph 2 letter a GDPR if special categories of data pursuant to Article 9 paragraph 1 GDPR are processed. In the event of explicit consent to the transfer of personal data to third countries, data processing is also carried out on the basis of Article 49 paragraph 1 letter a GDPR. If you have consented to the storage of cookies or access to information on your device (for example via device fingerprinting), data processing is also carried out on the basis of Section 25 paragraph 1 TDDDG. Consent can be withdrawn at any time. If your data is required to fulfil a contract or to carry out pre-contractual measures, we process your data on the basis of Article 6 paragraph 1 letter b GDPR. Furthermore, we process your data if this is necessary to fulfil a legal obligation on the basis of Article 6 paragraph 1 letter c GDPR. Data processing may also be carried out on the basis of our legitimate interest pursuant to Article 6 paragraph 1 letter f GDPR. Information on the relevant legal basis in each individual case is provided in the following paragraphs of this privacy policy.</p>
          <h3>Recipients of personal data</h3>
          <p>In the course of our business activities we work together with various external parties. In some cases, it is also necessary to transfer personal data to these external parties. We only pass on personal data to external parties if you have consented to this, if there is a legal obligation to do so, if we have a legitimate interest in transferring the data or if another legal basis permits the data to be transferred. When outsourcing processing to processors, we only pass on personal data on the basis of a contract on order processing. In the case of joint processing, a contract on joint processing is concluded.</p>
          <h3>Withdrawal of your consent to data processing</h3>
          <p>Many data processing operations are only possible with your explicit consent. You can withdraw consent that you have already given at any time. The lawfulness of the data processing carried out until the withdrawal remains unaffected by the withdrawal.</p>
          <h3>Right to object to data processing in special cases and to direct marketing (Article 21 GDPR)</h3>
          <p>IF DATA PROCESSING IS CARRIED OUT ON THE BASIS OF ARTICLE 6 PARAGRAPH 1 LETTER E OR F GDPR, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA AT ANY TIME FOR REASONS ARISING FROM YOUR PARTICULAR SITUATION; THIS ALSO APPLIES TO PROFILING BASED ON THESE PROVISIONS. THE RESPECTIVE LEGAL BASIS ON WHICH PROCESSING IS BASED CAN BE FOUND IN THIS PRIVACY POLICY. IF YOU OBJECT, WE WILL NO LONGER PROCESS YOUR AFFECTED PERSONAL DATA UNLESS WE CAN PROVE COMPELLING LEGITIMATE GROUNDS FOR THE PROCESSING WHICH OUTWEIGH YOUR INTERESTS, RIGHTS AND FREEDOMS OR THE PROCESSING SERVES TO ASSERT, EXERCISE OR DEFEND LEGAL CLAIMS (OBJECTION PURSUANT TO ARTICLE 21 PARAGRAPH 1 GDPR).</p>
          <p>IF YOUR PERSONAL DATA IS PROCESSED FOR DIRECT MARKETING PURPOSES, YOU HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF PERSONAL DATA CONCERNING YOU FOR THE PURPOSE OF SUCH ADVERTISING; THIS ALSO APPLIES TO PROFILING INSOFAR AS IT IS ASSOCIATED WITH SUCH DIRECT MARKETING. IF YOU OBJECT, YOUR PERSONAL DATA WILL NO LONGER BE USED FOR DIRECT MARKETING PURPOSES (OBJECTION PURSUANT TO ARTICLE 21 PARAGRAPH 2 GDPR).</p>
          <h3>Right to lodge a complaint with the competent supervisory authority</h3>
          <p>In the event of infringements of the GDPR, data subjects have a right to lodge a complaint with a supervisory authority, in particular in the Member State of their habitual residence, their place of work or the place of the alleged infringement. The right to lodge a complaint exists without prejudice to other administrative or judicial remedies.</p>
          <h3>Right to data portability</h3>
          <p>You have the right to have data that we process automatically on the basis of your consent or in fulfilment of a contract handed over to you or to a third party in a common, machine-readable format. If you request the direct transfer of the data to another controller, this will only be done if it is technically feasible.</p>
          <h3>SSL or TLS encryption</h3>
          <p>This site uses SSL or TLS encryption for security reasons and to protect the transmission of confidential content, such as orders or enquiries that you send to us as the site operator. You can recognise an encrypted connection by the fact that the address line of the browser changes from "http://" to "https://" and by the lock symbol in your browser line.</p>
          <p>If SSL or TLS encryption is activated, the data you transmit to us cannot be read by third parties.</p>
          <h3>Information, rectification and erasure</h3>
          <p>Within the framework of the applicable legal provisions, you have the right to receive information free of charge at any time about your stored personal data, its origin and recipient and the purpose of the data processing and, if necessary, a right to rectify or erase this data. You can contact us at any time for this purpose and for further questions on the subject of personal data.</p>
          <h3>Right to restriction of processing</h3>
          <p>You have the right to request the restriction of the processing of your personal data. You can contact us at any time for this purpose. The right to restriction of processing exists in the following cases:</p>
          <ul>
            <li>If you dispute the accuracy of the personal data stored by us, we usually need time to check this. For the duration of the verification, you have the right to request the restriction of the processing of your personal data.</li>
            <li>If the processing of your personal data was/is carried out unlawfully, you can request the restriction of data processing instead of erasure.</li>
            <li>If we no longer need your personal data, but you need it to exercise, defend or assert legal claims, you have the right to request the restriction of the processing of your personal data instead of erasure.</li>
            <li>If you have lodged an objection pursuant to Article 21 paragraph 1 GDPR, your interests and ours must be weighed up. As long as it has not yet been determined whose interests prevail, you have the right to request the restriction of the processing of your personal data.</li>
          </ul>
          <p>If you have restricted the processing of your personal data, this data – apart from its storage – may only be processed with your consent or for the establishment, exercise or defence of legal claims or for the protection of the rights of another natural or legal person or for reasons of important public interest of the European Union or a Member State.</p>
          <h3>Objection to promotional emails</h3>
          <p>We hereby object to the use of contact data published within the scope of the legal notice obligation to send unsolicited advertising and information materials. The operators of the pages expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information, for example via spam emails.</p>
        `,
        section3: `
          <h2>3. Data collection on this website</h2>
          <h3>Cookies</h3>
          <p>Our website does not use cookies that require consent on its own. Third-party embeds (YouTube, SoundCloud, Spotify) may load cookies under their respective responsibility and privacy policies.</p>
          <h3>Contact form</h3>
          <p>If you send us enquiries using the contact form, your details from the enquiry form, including the contact data you provide there, will be stored by us for the purpose of processing the enquiry and in the event of follow-up questions. We do not share this data without your consent.</p>
          <p>The processing of this data is based on Article 6 paragraph 1 letter b GDPR if your request is related to the performance of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of enquiries directed to us (Article 6 paragraph 1 letter f GDPR) or on your consent (Article 6 paragraph 1 letter a GDPR) if this has been requested; consent can be withdrawn at any time.</p>
          <p>The data you provide in the contact form will remain with us until you ask us to erase it, withdraw your consent to storage or the purpose for data storage no longer applies (for example after your enquiry has been processed). Mandatory statutory provisions – in particular retention periods – remain unaffected.</p>
        `,
        section4: `
          <h2>4. Hosting and content delivery networks (CDN)</h2>
          <h3>Amazon CloudFront CDN</h3>
          <p>We use the content delivery network (CDN) Amazon CloudFront. The provider is Amazon Web Services EMEA SARL, 38 Avenue John F. Kennedy, L-1855 Luxembourg (hereinafter "Amazon").</p>
          <p>Amazon CloudFront is a globally distributed content delivery network. Technically, the information transfer between your browser and our website is routed via the Amazon CloudFront network. This enables us to increase the worldwide accessibility and performance of our website.</p>
          <p>The use of Amazon CloudFront is based on our legitimate interest in providing our website as error-free and secure as possible (Article 6 paragraph 1 letter f GDPR). Where consent has been requested, processing is carried out exclusively on the basis of Article 6 paragraph 1 letter a GDPR and Section 25 paragraph 1 TDDDG, insofar as the consent includes the storage of cookies or access to information on the user's device (for example device fingerprinting). Consent can be withdrawn at any time.</p>
          <p>The transfer of data to the USA is based on the EU Commission's standard contractual clauses. Details can be found here: <a href="https://aws.amazon.com/blogs/security/aws-gdpr-data-processing-addendum/" target="_blank" rel="noopener noreferrer">https://aws.amazon.com/blogs/security/aws-gdpr-data-processing-addendum/</a>.</p>
          <p>The company is certified under the EU-US Data Privacy Framework (DPF). The DPF is an agreement between the European Union and the USA intended to ensure compliance with European data protection standards when processing data in the USA. Every company certified under the DPF undertakes to comply with these data protection standards. Further information can be found at: <a href="https://www.dataprivacyframework.gov/participant/4452" target="_blank" rel="noopener noreferrer">https://www.dataprivacyframework.gov/participant/4452</a>.</p>
        `,
        section5: `
          <h2>5. Plugins and tools</h2>
          <h3>YouTube</h3>
          <p>This website integrates videos hosted on YouTube. The operator of YouTube is Google Ireland Limited ("Google"), Gordon House, Barrow Street, Dublin 4, Ireland.</p>
          <p>When you visit one of our pages on which YouTube is embedded, a connection to YouTube servers is established. The YouTube server is informed about which of our pages you have visited.</p>
          <p>YouTube may also store various cookies on your device or use comparable technologies for recognition (for example device fingerprinting). In this way YouTube can obtain information about visitors to this website. Among other things, this information is used to collect video statistics, improve user friendliness and prevent fraud attempts. The data is also processed within the Google advertising network.</p>
          <p>If you are logged into your YouTube account, you enable YouTube to assign your browsing behaviour directly to your personal profile. You can prevent this by logging out of your YouTube account.</p>
          <p>YouTube is used in the interest of providing an attractive presentation of our online offerings. This represents a legitimate interest within the meaning of Article 6 paragraph 1 letter f GDPR. If corresponding consent has been requested, processing takes place exclusively on the basis of Article 6 paragraph 1 letter a GDPR and Section 25 paragraph 1 TDDDG, insofar as consent includes the storage of cookies or access to information on the user's device (for example device fingerprinting) within the meaning of the TDDDG. Consent can be withdrawn at any time.</p>
          <p>Further information on how user data is handled can be found in YouTube's privacy policy: <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy?hl=en</a>.</p>
          <p>The company is certified under the EU-US Data Privacy Framework (DPF). Further information can be found at: <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noopener noreferrer">https://www.dataprivacyframework.gov/participant/5780</a>.</p>
          <h3>SoundCloud</h3>
          <p>This website may integrate plugins of the social network SoundCloud (SoundCloud Limited, Berners House, 47-48 Berners Street, London W1T 3NF, United Kingdom). You can recognise the SoundCloud plugins by the SoundCloud logo on the relevant pages.</p>
          <p>When you visit this website, after the plugin is activated a direct connection is established between your browser and the SoundCloud server. SoundCloud therefore receives the information that you have visited this website with your IP address. If you click the "Like" or "Share" button while you are logged into your SoundCloud user account, you can link and/or share the content of this website on your SoundCloud profile. This enables SoundCloud to associate your visit to this website with your user account. We would like to point out that, as the provider of these pages, we have no knowledge of the content of the transmitted data or how it is used by SoundCloud.</p>
          <p>Data storage and analysis takes place on the basis of Article 6 paragraph 1 letter f GDPR. The website operator has a legitimate interest in achieving the broadest possible visibility in social media. If corresponding consent has been requested, processing takes place exclusively on the basis of Article 6 paragraph 1 letter a GDPR and Section 25 paragraph 1 TDDDG, insofar as the consent includes the storage of cookies or access to information on the user's device (for example device fingerprinting). Consent can be withdrawn at any time.</p>
          <p>The United Kingdom is regarded as a country with an adequate level of data protection. This means that the level of data protection is equivalent to that of the European Union.</p>
          <p>Further information can be found in SoundCloud's privacy policy: <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">https://soundcloud.com/pages/privacy</a>.</p>
          <p>If you do not want SoundCloud to associate your visit to this website with your SoundCloud user account, please log out of your SoundCloud account before activating SoundCloud content.</p>
          <h3>Spotify</h3>
          <p>This website integrates functions of the music service Spotify. The provider is Spotify AB, Birger Jarlsgatan 61, 113 56 Stockholm, Sweden. You can recognise Spotify plugins by the green logo on this website. An overview of the Spotify plugins can be found at: <a href="https://developer.spotify.com" target="_blank" rel="noopener noreferrer">https://developer.spotify.com</a>.</p>
          <p>When you visit this website via the plugin, a direct connection is established between your browser and the Spotify server. Spotify therefore receives the information that you have visited this website with your IP address. If you click the Spotify button while you are logged into your Spotify account, you can link the content of this website to your Spotify profile. This allows Spotify to associate the visit to this website with your user account.</p>
          <p>Please note that Spotify uses Google Analytics cookies when Spotify is used, so that your usage data may also be transmitted to Google when using Spotify. Google Analytics is a tool of the Google group designed to analyse user behaviour and is based in the USA. Spotify is solely responsible for this integration. As the website operator we have no influence on this processing.</p>
          <p>Data storage and analysis takes place on the basis of Article 6 paragraph 1 letter f GDPR. The website operator has a legitimate interest in the appealing acoustic design of the website. If the corresponding consent has been requested, processing takes place exclusively on the basis of Article 6 paragraph 1 letter a GDPR and Section 25 paragraph 1 TDDDG, insofar as the consent covers the storage of cookies or access to information on the user's device (for example device fingerprinting). Consent can be withdrawn at any time.</p>
          <p>Further information can be found in Spotify's privacy policy: <a href="https://www.spotify.com/en/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">https://www.spotify.com/en/legal/privacy-policy/</a>.</p>
          <p>If you do not want Spotify to be able to associate the visit to this website with your Spotify user account, please log out of your Spotify account before activating Spotify content.</p>
          <p>Source: <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer">https://www.e-recht24.de</a></p>
        `,
      },
    },
    de: {
      nav: {
        toggle: 'Navigation umschalten',
        biography: 'Biografie',
        media: 'Medien',
        releases: 'Releases',
        booking: 'Booking',
      },
      lang: {
        toggleLabel: 'Sprachauswahl',
        switchToEnglish: 'Auf Englisch wechseln',
        switchToGerman: 'Auf Deutsch wechseln',
      },
      footer: {
        legal: 'Impressum',
        privacy: 'Datenschutzerklärung',
      },
      home: {
        metaTitle: 'KIZU - Portfolio',
        metaDescription: 'Offizielles Künstlerportfolio: Biografie, Medien und Buchung.',
        intro: {
          eyebrow: 'Producer & DJ',
          heading: 'Fesselnde Clubreisen voller euphorischer Melodien und treibender Beats.',
          body: 'Der aus Ravensburg stammende Künstler vereint Trance, Speed Garage und Hard House zu kraftvollen Sets.',
          ctaPrimary: 'Booking anfragen',
          ctaSecondary: 'Releases anhören',
          tagsLabel: 'Sounds und Stimmungen',
          tag1: 'Trance',
          tag2: 'Speed Garage',
          tag3: 'Hard House',
        },
        spotlight: {
          story: {
            label: 'Story',
            heading: 'Biografie',
            copy: 'Ursprünge, Einflüsse und kleine Geschichten über mich',
            link: 'Mehr erfahren →',
          },
          visuals: {
            label: 'Visuals',
            heading: 'Medien',
            copy: 'Hochkontrastige Bilder und Live-Momente',
            link: 'Ansehen →',
          },
          catalogue: {
            label: 'Katalog',
            heading: 'Releases',
            copy: 'Singles und Mixes für spätnächtlichen Drive.',
            link: 'Reinhören →',
          },
        },
        pulse: {
          eyebrow: 'Signature-Vibe',
          heading: 'Clubenergie mit Herz.',
          body: 'Bass, Breakdowns, Hard House und Herz: Meine Sets sind pure Energie und machen jede Show zu einem besonderen Erlebnis.',
          listLabel: 'Sound-DNA',
          sound: {
            term: 'Sound',
            desc: 'Speed Garage, Trance, Hard House und Acid-Lines für Gänsehautmomente.',
          },
          vibe: {
            term: 'Vibe',
            desc: 'High-Energy-Rave, abstrakte Übergänge und treibende Melodien, die dich in Handumdrehen einen Bassface auslösen.',
          },
          mission: {
            term: 'Mission',
            desc: 'Eine Community schaffen. Auf dem Dancefloor - fürs Wohnzimmer.',
          },
          ctaMedia: 'Medien ansehen',
          ctaReleases: 'Neueste Releases',
          imageAlt: 'KIZU während eines Clubsets im violetten Licht',
          overlay: 'Rave safe, rave loud.',
        },
      },
      bio: {
        metaTitle: 'KIZU - Biografie',
        header: {
          title: 'Biografie',
          lead: 'Kizu ist ein junger, vielseitiger Künstler mit der Mission, Emotionen zu wecken, Freude zu schenken und die geballte Kraft elektronischer Musik auf die Tanzfläche zu entfesseln.',
        },
        media: {
          alt: 'Porträt',
        },
        about: {
          title: 'Über mich',
          p1: 'Von Ravensburg aus verbreitet Kizu eine ansteckend positive Energie – für Musik und Crowd gibt er stets mehr als 100 % und seine Feel-Good-Sets verbinden treibenden Groove, tranceartige Höhen und jede Menge Glücksmomente',
          p2: 'Kizu begann Ende 2023 mit dem Auflegen und stieg 2024 in die Musikproduktion ein, wo er seinen Signature Sound in kurzer Zeit prägte. Seine Bookings umfassen bereits Clubs und Residenzen wie Hans-Bunte-Areal (Freiburg) und Club Douala (Ravensburg) sowie Gigs im Circle (Offenburg) und //:about Blank (Berlin).',
          p3: 'Seine Releases und Signings erschienen unter anderem bei Para//e/ (Berlin), SYNTHX Records (München), Milli Records (Berlin) und SeshDawgsUnited (Berlin).',
          p4: 'Spread love and you will receive love.',
        },
        highlights: {
          title: 'Highlights',
          item1: 'Festival-Auftritte',
          item2: 'Label-Releases',
          festivalModal: {
            title: 'Festival-Auftritte',
            intro: 'Einblicke in besondere Festivalshows.',
            list: '<li>Hart bis Zart Festival - Freiburg (2024)</li><li>Hart bis Zart Festival - Freiburg (2025)</li><li>Backyard77 - Offenburg (2025)</li>',
            close: 'Schließen',
          },
        },
        contact: {
          title: 'Kontakt & Booking',
          body: 'E-Mail: <a href="mailto:bookings@kizuloge.com">bookings@kizuloge.com</a>',
        },
        stats: {
          label: 'Karriere-Highlights',
          valueYears: '2',
          labelYears: 'Jahre als DJ',
          valueReleases: '9',
          labelReleases: 'Releases veröffentlicht',
          valueClubs: '7',
          labelClubs: 'Clubs gespielt',
          clubsModal: {
            title: 'Gespielte Clubs',
            intro: 'Diese Bühnen durfte ich bereits bespielen:',
            list: '<li>Hans-Bunte-Areal - Freiburg</li><li>Club Douala - Ravensburg</li><li>Circle - Offenburg</li><li>//:about blank - Berlin</li><li>Bahnwärter Thiel - München</li><li>Gleis44 - Ulm</li><li>TheGreatRängTäng - Freiburg</li>',
            close: 'Schließen',
          },
        },
      },
      media: {
        metaTitle: 'KIZU - Fotos & Videos',
        header: {
          title: 'Fotos & Videos',
          lead: 'Mittendrin-Erlebnisse aus dem Booth plus die Stillframes für die Stimmung.',
        },
        videos: {
          eyebrow: 'Live-Energie',
          title: 'DJ-Sets in Bewegung',
          lead: 'Der Booth, das Licht, die Crowd – sieh zu, wie die Energie entsteht.',
          playLabel: 'Video abspielen',
          playCta: 'Video abspielen',
        },
        photos: {
          eyebrow: 'Stille Momente',
          title: 'Foto-Highlights',
          lead: 'Weiche Eindrücke, die sich dezent hinter die Musik legen.',
        },
        slider: {
          prev: 'Vorheriges Bild',
          img1: 'Liveshow',
          img2: 'Studiosession',
          img3: 'Porträt',
          next: 'Nächstes Bild',
        },
        lightbox: {
          close: 'Schließen',
          alt: 'Erweitertes Medium',
        },
      },
      releases: {
        metaTitle: 'KIZU - Releases',
        header: {
          title: 'Releases',
          lead: 'Tracks, Mixes und Highlights aus meiner Karriere zum Entdecken.',
        },
        filters: {
          all: 'Alle',
          tracks: 'Tracks',
          mixes: 'Mixes',
          labels: 'Labels',
        },
        hbyl: {
          frontLabel: 'Release-Details zu Haunted By Your Love anzeigen',
          coverAlt: 'Haunted By Your Love Cover',
          desc: 'Super melancholische Sommer-Hymne.',
        },
        actions: {
          back: 'Zurück zum Cover',
        },
        badges: {
          track: 'Track',
          mix: 'Mixes',
        },
        listenLabel: 'Anhören',
        outtaspace: {
          frontLabel: 'Release-Details zu Outta Space anzeigen',
          coverAlt: 'Outta Space Cover',
          desc: 'Wir lieben Acid.',
        },
        foundyou: {
          frontLabel: 'Release-Details zu Found You anzeigen',
          coverAlt: 'Found You Cover',
          desc: 'Dein neuer Lieblingssong fürs Closing.',
        },
        blowakiss: {
          frontLabel: 'Release-Details zu Blow A Kiss anzeigen',
          coverAlt: 'Blow A Kiss Cover',
          desc: 'Super treibender Kopfnicker.',
        },
        mixes: {
          title: 'Alle Mixes Playlist',
          note: 'Play drücken und alle hochgeladenen Mixes am Stück hören.',
        },
        labels: {
          title: 'Label-Highlights',
          parallel: 'Parallel Label',
          parallelAlt: 'Parallel Label',
          synthx: 'Synthx Records',
          synthxAlt: 'Synthx Records',
          coming: 'In Kürze',
          milliAlt: 'Milli Records',
        },
      },
      booking: {
        metaTitle: 'KIZU - Booking',
        header: {
          title: 'Technical & Hospitality Rider',
          lead: 'Lade dir hier den aktuellen Rider als PDF herunter oder sieh ihn dir an.',
          primaryCta: 'Booking anfragen',
          download: 'Rider herunterladen',
          open: 'Im neuen Tab öffnen',
        },
        rider: {
          title: 'KIZU Technical Rider',
          fallback: 'PDF-Vorschau nicht verfügbar? <a href="../assets/docs/KIZU_Rider.pdf">Rider herunterladen</a>.',
        },
        form: {
          title: 'Kontaktformular',
          lead: 'Schicke deine Anfrage direkt über das Formular oder nutze die E-Mail-Adresse. Nach dem Absenden öffnet sich dein Mailprogramm, damit du Anhänge ergänzen kannst.',
          name: 'Name *',
          email: 'E-Mail *',
          subject: 'Betreff',
          subjectPlaceholder: 'Booking, Presse, allgemeine Anfrage ...',
          message: 'Nachricht *',
          messagePlaceholder: 'Wobei können wir helfen?',
          privacy: 'Ich habe das <a href="../impressum/">Impressum</a> gelesen und stimme zu, dass meine Angaben zur Beantwortung verarbeitet werden.',
          submit: 'Nachricht senden',
          disclaimer: 'Das Formular öffnet dein E-Mail-Programm, damit du die Nachricht prüfen und versenden kannst. Es werden keine Daten auf diesem Server gespeichert.',
        },
      },
      imprint: {
        metaTitle: 'KIZU - Impressum',
        metaDescription: 'Impressum und rechtliche Angaben zum offiziellen Portfolio von KIZU.',
        header: `
          <h1>Impressum</h1>
          <p>Angaben gemäß § 5 TMG und § 55 RStV.</p>
        `,
        sectionInfo: `
          <h2>Angaben gemäß § 5 TMG</h2>
          <address>
            <strong>Andrei Moldovan</strong><br />
            DJ / Producer<br />
            Wilhelmstrasse 14<br />
            88250 Weingarten<br />
            Deutschland
          </address>
        `,
        sectionContact: `
          <h2>Kontakt</h2>
          <p>Telefon: <a href="tel:+4917632817822">+49 (0) 176 328 17822</a><br />
          E-Mail: <a href="mailto:info@kizuloge.com">info@kizuloge.com</a></p>
          <p>Alternativ kannst du das <a href="../booking/#contact-form">Kontaktformular</a> auf der Booking-Seite nutzen.</p>
        `,
        sectionDispute: `
          <h2>Verbraucherstreitbeilegung</h2>
          <p>Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          <p>Quelle: <a href="https://www.e-recht24.de" rel="noopener" target="_blank">e-recht24.de</a></p>
        `,
        sectionContent: `
          <h2>Haftung für Inhalte</h2>
          <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir diese Inhalte umgehend.</p>
        `,
        sectionLinks: `
          <h2>Haftung für Links</h2>
          <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
          <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.</p>
        `,
        sectionCopyright: `
          <h2>Urheberrecht</h2>
          <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
          <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Solltest du trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Inhalte umgehend.</p>
        `,
        sectionOdr: `
          <h2>Online-Streitbeilegung</h2>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" rel="noopener" target="_blank">https://ec.europa.eu/consumers/odr</a>. Unsere E-Mail-Adresse findest du oben im Impressum.</p>
        `,
      },
      privacy: {
        metaTitle: 'KIZU - Datenschutzerklärung',
        metaDescription: 'Informationen zum Umgang mit personenbezogenen Daten auf der offiziellen KIZU Website.',
        header: `
          <h1>Datenschutzerklärung</h1>
          <p>Informationen gemäß Artikel 13 DSGVO darüber, wie wir mit personenbezogenen Daten umgehen.</p>
        `,
        section1: `
          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst. Ausführliche Informationen zum Thema Datenschutz entnimmst du unserer nachfolgenden Datenschutzerklärung.</p>
          <h3>Datenerfassung auf dieser Website</h3>
          <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
          <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten findest du im Abschnitt „Verantwortliche Stelle“ in dieser Datenschutzerklärung.</p>
          <h4>Wie erfassen wir deine Daten?</h4>
          <p>Deine Daten werden zum einen dadurch erhoben, dass du uns diese mitteilst. Hierbei kann es sich z. B. um Daten handeln, die du in ein Kontaktformular eingibst.</p>
          <p>Andere Daten werden automatisch oder nach deiner Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung erfolgt automatisch, sobald du diese Website betrittst.</p>
          <h4>Wofür nutzen wir deine Daten?</h4>
          <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse deines Nutzerverhaltens verwendet werden. Soweit über die Website Verträge angebahnt oder abgeschlossen werden können, verarbeiten wir übermittelte Daten außerdem für Angebote, Bestellungen oder sonstige Anfragen.</p>
          <h4>Welche Rechte hast du bezüglich deiner Daten?</h4>
          <p>Du hast jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck deiner gespeicherten personenbezogenen Daten zu erhalten. Du hast außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn du eine Einwilligung zur Datenverarbeitung erteilt hast, kannst du diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem hast du das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung deiner personenbezogenen Daten zu verlangen. Des Weiteren steht dir ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
          <p>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz kannst du dich jederzeit an uns wenden.</p>
        `,
        section2: `
          <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3>Datenschutz</h3>
          <p>Die Betreiber dieser Seiten nehmen den Schutz deiner persönlichen Daten sehr ernst. Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
          <p>Wenn du diese Website benutzt, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen du persönlich identifiziert werden kannst. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
          <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
          <h3>Verantwortliche Stelle</h3>
          <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <p>KIZU Productions<br />
          Wilhelmstrasse 14<br />
          88250 Weingarten<br />
          Deutschland</p>
          <p>Telefon: <a href="tel:+4917632817822">+49 (0) 176 328 17822</a><br />
          E-Mail: <a href="mailto:info@kizuloge.com">info@kizuloge.com</a></p>
          <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
          <h3>Speicherdauer</h3>
          <p>Soweit in dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben deine personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn du ein berechtigtes Löschersuchen stellst oder eine Einwilligung zur Datenverarbeitung widerrufst, werden deine Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung deiner personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); in letzterem Fall erfolgt die Löschung nach Fortfall dieser Gründe.</p>
          <h3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
          <p>Sofern du in die Datenverarbeitung eingewilligt hast, verarbeiten wir deine personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Hast du in die Speicherung von Cookies oder in den Zugriff auf Informationen in dein Endgerät (z. B. via Device-Fingerprinting) eingewilligt, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind deine Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir deine Daten auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Darüber hinaus verarbeiten wir deine Daten, sofern dies zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.</p>
          <h3>Empfänger von personenbezogenen Daten</h3>
          <p>Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei kann auch eine Übermittlung personenbezogener Daten erforderlich sein. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn du eingewilligt hast, eine gesetzliche Verpflichtung besteht, wir ein berechtigtes Interesse an der Weitergabe haben oder eine andere Rechtsgrundlage die Weitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten nur auf Grundlage eines Auftragsverarbeitungsvertrags weiter. Bei gemeinsamer Verarbeitung wird ein Vertrag über die gemeinsame Verarbeitung geschlossen.</p>
          <h3>Widerruf deiner Einwilligung zur Datenverarbeitung</h3>
          <p>Viele Datenverarbeitungsvorgänge sind nur mit deiner ausdrücklichen Einwilligung möglich. Du kannst eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>
          <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
          <p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HAST DU JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS DEINER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG DEINER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNIMMST DU DIESER DATENSCHUTZERKLÄRUNG. WENN DU WIDERSPRUCH EINLEGST, WERDEN WIR DEINE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE DEINE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN, ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p>
          <p>WERDEN DEINE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, HAST DU DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG DICH BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN DU WIDERSPRICHST, WERDEN DEINE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p>
          <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
          <p>Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>
          <h3>Recht auf Datenübertragbarkeit</h3>
          <p>Du hast das Recht, Daten, die wir auf Grundlage deiner Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an dich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern du die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangst, erfolgt dies nur, soweit es technisch machbar ist.</p>
          <h3>SSL- bzw. TLS-Verschlüsselung</h3>
          <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die du an uns als Seitenbetreiber sendest, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in deiner Browserzeile.</p>
          <p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können Daten, die du an uns übermittelst, nicht von Dritten mitgelesen werden.</p>
          <h3>Auskunft, Löschung und Berichtigung</h3>
          <p>Du hast im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten kannst du dich jederzeit an uns wenden.</p>
          <h3>Recht auf Einschränkung der Verarbeitung</h3>
          <p>Du hast das Recht, die Einschränkung der Verarbeitung deiner personenbezogenen Daten zu verlangen. Hierzu kannst du dich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:</p>
          <ul>
            <li>Wenn du die Richtigkeit deiner bei uns gespeicherten personenbezogenen Daten bestreitest, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung hast du das Recht, die Einschränkung der Verarbeitung deiner personenbezogenen Daten zu verlangen.</li>
            <li>Wenn die Verarbeitung deiner personenbezogenen Daten unrechtmäßig geschah/geschieht, kannst du statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
            <li>Wenn wir deine personenbezogenen Daten nicht mehr benötigen, du sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigst, hast du das Recht, statt der Löschung die Einschränkung der Verarbeitung deiner personenbezogenen Daten zu verlangen.</li>
            <li>Wenn du einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt hast, muss eine Abwägung zwischen deinen und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, hast du das Recht, die Einschränkung der Verarbeitung deiner personenbezogenen Daten zu verlangen.</li>
          </ul>
          <p>Wenn du die Verarbeitung deiner personenbezogenen Daten eingeschränkt hast, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit deiner Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.</p>
          <h3>Widerspruch gegen Werbe-E-Mails</h3>
          <p>Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.</p>
        `,
        section3: `
          <h2>3. Datenerfassung auf dieser Website</h2>
          <h3>Cookies</h3>
          <p>Unsere Website setzt von sich aus keine zustimmungspflichtigen Cookies ein. Eingebettete Inhalte von Dritten (YouTube, SoundCloud, Spotify) können unter eigener Verantwortung und eigenen Datenschutzerklärungen Cookies laden.</p>
          <h3>Kontaktformular</h3>
          <p>Wenn du uns über das Kontaktformular Anfragen zukommen lässt, werden deine Angaben aus dem Formular inklusive der von dir dort angegebenen Kontaktdaten zum Zwecke der Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung weiter.</p>
          <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern deine Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.</p>
          <p>Die von dir im Kontaktformular eingegebenen Daten verbleiben bei uns, bis du uns zur Löschung aufforderst, deine Einwilligung zur Speicherung widerrufst oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung deiner Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.</p>
        `,
        section4: `
          <h2>4. Hosting und Content Delivery Networks (CDN)</h2>
          <h3>Amazon CloudFront CDN</h3>
          <p>Wir nutzen das Content Delivery Network (CDN) Amazon CloudFront. Anbieter ist die Amazon Web Services EMEA SARL, 38 Avenue John F. Kennedy, L-1855 Luxemburg (nachfolgend „Amazon“).</p>
          <p>Amazon CloudFront ist ein weltweit verteiltes CDN. Technisch erfolgt die Informationsübertragung zwischen deinem Browser und unserer Website über das Netzwerk von Amazon CloudFront. Dadurch können wir die weltweite Erreichbarkeit und Performance unserer Website verbessern.</p>
          <p>Der Einsatz von Amazon CloudFront erfolgt auf Grundlage unseres berechtigten Interesses an einer möglichst fehlerfreien und sicheren Bereitstellung unserer Website (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
          <p>Die Übertragung von Daten in die USA erfolgt auf Grundlage der Standardvertragsklauseln der EU-Kommission. Details findest du hier: <a href="https://aws.amazon.com/blogs/security/aws-gdpr-data-processing-addendum/" target="_blank" rel="noopener noreferrer">https://aws.amazon.com/blogs/security/aws-gdpr-data-processing-addendum/</a>.</p>
          <p>Das Unternehmen ist unter dem EU-US Data Privacy Framework (DPF) zertifiziert. Das DPF ist eine Vereinbarung zwischen der Europäischen Union und den USA, die die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. jeder zertifizierte Anbieter verpflichtet sich, diese Standards einzuhalten. Weitere Informationen findest du unter: <a href="https://www.dataprivacyframework.gov/participant/4452" target="_blank" rel="noopener noreferrer">https://www.dataprivacyframework.gov/participant/4452</a>.</p>
        `,
        section5: `
          <h2>5. Plugins und Tools</h2>
          <h3>YouTube</h3>
          <p>Diese Website bindet Videos der Plattform YouTube ein. Betreiber von YouTube ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.</p>
          <p>Wenn du eine unserer Seiten besuchst, auf denen YouTube eingebunden ist, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten du besucht hast.</p>
          <p>YouTube kann außerdem verschiedene Cookies auf deinem Endgerät speichern oder vergleichbare Wiedererkennungstechnologien einsetzen (z. B. Device-Fingerprinting). Auf diese Weise kann YouTube Informationen über Besucher dieser Website erhalten. Diese Informationen werden u. a. genutzt, um Videostatistiken zu erfassen, die Benutzerfreundlichkeit zu verbessern und Betrugsversuchen vorzubeugen. Die Daten werden zudem im Google-Werbenetzwerk verarbeitet.</p>
          <p>Bist du in deinem YouTube-Account eingeloggt, ermöglichst du YouTube, dein Surfverhalten direkt deinem persönlichen Profil zuzuordnen. Du kannst dies verhindern, indem du dich aus deinem YouTube-Account ausloggst.</p>
          <p>Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
          <p>Weitere Informationen zum Umgang mit Nutzerdaten findest du in der Datenschutzerklärung von YouTube: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy?hl=de</a>.</p>
          <p>Das Unternehmen ist unter dem EU-US Data Privacy Framework (DPF) zertifiziert. Weitere Informationen findest du unter: <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noopener noreferrer">https://www.dataprivacyframework.gov/participant/5780</a>.</p>
          <h3>SoundCloud</h3>
          <p>Diese Website kann Plugins des sozialen Netzwerks SoundCloud (SoundCloud Limited, Berners House, 47-48 Berners Street, London W1T 3NF, Vereinigtes Königreich) einbinden. Die SoundCloud-Plugins erkennst du am SoundCloud-Logo auf den betreffenden Seiten.</p>
          <p>Wenn du diese Website besuchst, wird nach Aktivierung des Plugins eine direkte Verbindung zwischen deinem Browser und dem SoundCloud-Server hergestellt. SoundCloud erhält dadurch die Information, dass du diese Website mit deiner IP-Adresse besucht hast. Wenn du den „Like“- oder „Share“-Button anklickst, während du in deinem SoundCloud-Nutzerkonto eingeloggt bist, kannst du die Inhalte dieser Website mit deinem SoundCloud-Profil verlinken und/oder teilen. Dadurch kann SoundCloud den Besuch dieser Website deinem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch SoundCloud erhalten.</p>
          <p>Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer möglichst umfangreichen Sichtbarkeit in den sozialen Medien. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
          <p>Das Vereinigte Königreich gilt als Drittland mit einem datenschutzrechtlich angemessenen Schutzniveau. Das bedeutet, das Datenschutzniveau entspricht dem der Europäischen Union.</p>
          <p>Weitere Informationen findest du in der Datenschutzerklärung von SoundCloud: <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">https://soundcloud.com/pages/privacy</a>.</p>
          <p>Wenn du nicht möchtest, dass SoundCloud den Besuch dieser Website deinem SoundCloud-Nutzerkonto zuordnet, logge dich vor der Aktivierung des SoundCloud-Inhalts aus deinem SoundCloud-Konto aus.</p>
          <h3>Spotify</h3>
          <p>Diese Website bindet Funktionen des Musikdienstes Spotify ein. Anbieter ist die Spotify AB, Birger Jarlsgatan 61, 113 56 Stockholm, Schweden. Die Spotify-Plugins erkennst du an dem grünen Logo auf dieser Website. Eine Übersicht über die Spotify-Plugins findest du hier: <a href="https://developer.spotify.com" target="_blank" rel="noopener noreferrer">https://developer.spotify.com</a>.</p>
          <p>Wenn du diese Website über das Plugin besuchst, wird eine direkte Verbindung zwischen deinem Browser und dem Spotify-Server hergestellt. Spotify erhält dadurch die Information, dass du diese Website mit deiner IP-Adresse besucht hast. Wenn du den Spotify-Button anklickst, während du in deinem Spotify-Account eingeloggt bist, kannst du die Inhalte dieser Website mit deinem Spotify-Profil verlinken. Dadurch kann Spotify den Besuch dieser Website deinem Benutzerkonto zuordnen.</p>
          <p>Bitte beachte, dass Spotify bei Nutzung von Spotify Google-Analytics-Cookies verwendet, so dass deine Nutzungsdaten beim Einsatz von Spotify auch an Google übertragen werden können. Google Analytics ist ein Tool des Google-Konzerns zur Analyse des Nutzerverhaltens und hat seinen Sitz in den USA. Spotify ist für diese Einbindung allein verantwortlich. Als Websitebetreiber haben wir auf diese Verarbeitung keinen Einfluss.</p>
          <p>Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer klanglich ansprechenden Gestaltung seiner Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
          <p>Weitere Informationen findest du in der Datenschutzerklärung von Spotify: <a href="https://www.spotify.com/de/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">https://www.spotify.com/de/legal/privacy-policy/</a>.</p>
          <p>Wenn du nicht möchtest, dass Spotify den Besuch dieser Website deinem Spotify-Nutzerkonto zuordnen kann, logge dich vor der Aktivierung des Spotify-Inhalts aus deinem Spotify-Konto aus.</p>
          <p>Quelle: <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer">https://www.e-recht24.de</a></p>
        `,
      },
    },
  };

  const defaultLanguage = 'en';
  const storageKey = 'kizu-language';
  const supportedLanguages = Object.keys(translations);

  const normalizeLang = (value) => {
    if (!value) return null;
    const short = value.toLowerCase().slice(0, 2);
    return supportedLanguages.includes(short) ? short : null;
  };

  const resolveTranslation = (lang, key) => {
    const parts = key.split('.');
    let result = translations[lang];
    for (const part of parts) {
      if (result && Object.prototype.hasOwnProperty.call(result, part)) {
        result = result[part];
      } else {
        return undefined;
      }
    }
    return typeof result === 'string' ? result : undefined;
  };

  const getStoredLanguage = () => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      return normalizeLang(stored);
    } catch (error) {
      return null;
    }
  };

  const setStoredLanguage = (lang) => {
    try {
      window.localStorage.setItem(storageKey, lang);
    } catch (error) {
      // ignore storage errors
    }
  };

  const languageButtons = document.querySelectorAll('[data-lang-switch] [data-lang]');

  let currentLanguage = null;

  const applyLanguage = (lang) => {
    const normalized = normalizeLang(lang) || defaultLanguage;
    if (normalized === currentLanguage) return;
    document.documentElement.lang = normalized;
    if (document.body) {
      document.body.dataset.language = normalized;
    }
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach((element) => {
      const key = element.dataset.i18n;
      if (!key) return;
      const attr = element.dataset.i18nAttr;
      const mode = element.dataset.i18nMode;
      const value = resolveTranslation(normalized, key) ?? resolveTranslation(defaultLanguage, key);
      if (value === undefined) return;
      if (attr) {
        element.setAttribute(attr, value);
      } else if (mode === 'html') {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    });
    languageButtons.forEach((button) => {
      const isActive = (button.dataset.lang || '').toLowerCase() === normalized;
      button.setAttribute('aria-pressed', String(isActive));
    });
    document.querySelectorAll('[data-lang-switch]').forEach((switcher) => {
      switcher.setAttribute('data-active-lang', normalized);
    });
    currentLanguage = normalized;
    setStoredLanguage(normalized);
  };

  const detectInitialLanguage = () => {
    const stored = getStoredLanguage();
    if (stored) return stored;
    const candidates = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language, navigator.userLanguage];
    for (const candidate of candidates) {
      const normalized = normalizeLang(candidate);
      if (normalized) return normalized;
    }
    return defaultLanguage;
  };

  languageButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const target = button.dataset.lang;
      if (target) {
        applyLanguage(target);
      }
    });
  });

  applyLanguage(detectInitialLanguage());
  // Update year stamp
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation toggle
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Modals
  const modalElements = document.querySelectorAll('[data-modal]');
  if (modalElements.length) {
    const modalMap = new Map();
    const returnFocus = new WeakMap();
    const openModals = new Set();
    let scrollPosition = 0;
    const focusableSelectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const lockBodyScroll = () => {
      if (document.body.classList.contains('has-modal-open')) return;
      scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.dataset.modalScroll = String(scrollPosition);
      document.body.classList.add('has-modal-open');
    };

    const unlockBodyScroll = () => {
      if (!document.body.classList.contains('has-modal-open')) return;
      const stored = document.body.dataset.modalScroll;
      document.body.classList.remove('has-modal-open');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('width');
      const restoreTo = stored ? Number.parseInt(stored, 10) : scrollPosition;
      if (!Number.isNaN(restoreTo)) {
        window.scrollTo(0, restoreTo);
      }
      if (stored) {
        delete document.body.dataset.modalScroll;
      }
    };

    const updateBodyState = () => {
      if (openModals.size) {
        lockBodyScroll();
      } else {
        unlockBodyScroll();
      }
    };

    const getFocusableElements = (modal) => {
      return Array.from(modal.querySelectorAll(focusableSelectors)).filter((element) => {
        if (element.hasAttribute('disabled')) return false;
        if (element.getAttribute('aria-hidden') === 'true') return false;
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });
    };

    const focusFirstElement = (modal) => {
      const focusable = getFocusableElements(modal);
      const target = focusable[0] || modal.querySelector('.modal-dialog');
      if (target && typeof target.focus === 'function') {
        window.setTimeout(() => {
          try {
            target.focus({ preventScroll: true });
          } catch (error) {
            target.focus();
          }
        }, 20);
      }
    };

    const trapFocus = (event, modal) => {
      if (event.key !== 'Tab') return;
      const focusable = getFocusableElements(modal);
      if (!focusable.length) {
        event.preventDefault();
        const dialog = modal.querySelector('.modal-dialog');
        if (dialog) dialog.focus({ preventScroll: true });
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey) {
        if (active === first || !modal.contains(active)) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    const setExpandedState = (trigger, expanded) => {
      if (!trigger) return;
      trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };

    const closeModal = (modal) => {
      if (!modal || !openModals.has(modal)) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      const trigger = returnFocus.get(modal);
      if (trigger) {
        setExpandedState(trigger, false);
      }
      const hideModal = (event) => {
        if (event && event.target !== modal) return;
        if (modal.classList.contains('is-open')) return;
        modal.setAttribute('hidden', '');
        modal.removeEventListener('transitionend', hideModal);
      };
      modal.addEventListener('transitionend', hideModal);
      window.setTimeout(hideModal, 320);
      openModals.delete(modal);
      updateBodyState();
      window.setTimeout(() => {
        if (trigger && typeof trigger.focus === 'function') {
          trigger.focus({ preventScroll: true });
        }
      }, 30);
      returnFocus.delete(modal);
    };

    const openModal = (id, trigger) => {
      const modal = modalMap.get(id);
      if (!modal) return;
      if (openModals.has(modal)) return;
      modal.removeAttribute('hidden');
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('is-open');
      if (trigger) {
        returnFocus.set(modal, trigger);
        setExpandedState(trigger, true);
      }
      openModals.add(modal);
      updateBodyState();
      focusFirstElement(modal);
    };

    document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
      const id = trigger.dataset.modalOpen;
      if (!id) return;
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openModal(id, trigger);
      });
      trigger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(id, trigger);
        }
      });
    });

    modalElements.forEach((modal) => {
      const id = modal.dataset.modal;
      if (!id) return;
      modalMap.set(id, modal);
      modal.addEventListener('click', (event) => {
        const closer = event.target.closest('[data-modal-close]');
        if (closer) {
          event.preventDefault();
          closeModal(modal);
        }
      });
      modal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeModal(modal);
        } else if (event.key === 'Tab') {
          trapFocus(event, modal);
        }
      });
    });
  }

  // Gallery lightbox
  const gallery = document.querySelector('[data-gallery]');
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImg = document.querySelector('.lightbox-media');
  const lightboxClose = document.querySelector('.lightbox-close');
  if (gallery && lightbox && lightboxImg && lightboxClose) {
    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.removeAttribute('src');
      lightboxImg.removeAttribute('srcset');
      lightboxImg.onerror = null;
    };

    gallery.addEventListener('click', (event) => {
      const img = event.target.closest('img[data-full]');
      if (!img) return;
      const fallbackSrc = img.dataset.full || '';
      const candidate = img.dataset.fullWebp || fallbackSrc || img.currentSrc;
      lightboxImg.decoding = 'async';
      if (fallbackSrc && fallbackSrc !== candidate) {
        lightboxImg.onerror = () => {
          lightboxImg.onerror = null;
          lightboxImg.src = fallbackSrc;
        };
      } else {
        lightboxImg.onerror = null;
      }
      lightboxImg.src = candidate;
      lightbox.hidden = false;
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  // Media slider
  const mediaSlider = document.querySelector('[data-media-slider]');
  if (mediaSlider) {
    const track = mediaSlider.querySelector('[data-media-track]');
    const slides = track ? Array.from(track.querySelectorAll('.media-slide')) : [];
    const prev = mediaSlider.querySelector('[data-media-prev]');
    const next = mediaSlider.querySelector('[data-media-next]');
    const dotsWrap = mediaSlider.querySelector('[data-media-dots]');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let autoTimer = null;
    const autoDelay = 7000;

    if (slides.length) {
      const initialIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
      if (initialIndex >= 0) {
        index = initialIndex;
      } else {
        slides[0].classList.add('is-active');
      }
    }

    const applyTransform = (immediate) => {
      if (!track) return;
      if (immediate) {
        track.classList.add('is-immediate');
      } else {
        track.classList.remove('is-immediate');
      }
      track.style.transform = `translateX(-${index * 100}%)`;
      if (immediate) {
        const restore = () => track.classList.remove('is-immediate');
        if (typeof window.requestAnimationFrame === 'function') {
          window.requestAnimationFrame(restore);
        } else {
          setTimeout(restore, 16);
        }
      }
    };

    const updateActiveStates = () => {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('is-active', idx === index);
      });
      if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll('button');
        dots.forEach((dot, idx) => {
          dot.setAttribute('aria-current', idx === index ? 'true' : 'false');
        });
      }
    };

    const goTo = (target, options) => {
      if (!slides.length) return;
      const immediate = options && options.immediate;
      index = (target + slides.length) % slides.length;
      updateActiveStates();
      applyTransform(immediate);
    };

    const stopAuto = () => {
      if (autoTimer) {
        clearTimeout(autoTimer);
        autoTimer = null;
      }
    };

    const scheduleAuto = () => {
      if (motionQuery.matches) return;
      stopAuto();
      autoTimer = setTimeout(() => {
        goTo(index + 1);
        scheduleAuto();
      }, autoDelay);
    };

    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to highlight ${idx + 1}`);
        if (idx === index) dot.setAttribute('aria-current', 'true');
        dot.addEventListener('click', () => {
          goTo(idx);
          scheduleAuto();
        });
        dotsWrap.appendChild(dot);
      });
    };

    buildDots();
    goTo(index, { immediate: true });
    scheduleAuto();

    if (prev) {
      prev.addEventListener('click', () => {
        goTo(index - 1);
        scheduleAuto();
      });
    }

    if (next) {
      next.addEventListener('click', () => {
        goTo(index + 1);
        scheduleAuto();
      });
    }

    mediaSlider.addEventListener('pointerenter', stopAuto);
    mediaSlider.addEventListener('pointerleave', scheduleAuto);
    mediaSlider.addEventListener('focusin', stopAuto);
    mediaSlider.addEventListener('focusout', (event) => {
      const nextTarget = event.relatedTarget;
      if (!nextTarget || !mediaSlider.contains(nextTarget)) {
        scheduleAuto();
      }
    });

    mediaSlider.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(index - 1);
        scheduleAuto();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(index + 1);
        scheduleAuto();
      }
    });

    window.addEventListener('resize', () => goTo(index, { immediate: true }));

    const handleVisibility = () => {
      if (document.hidden) {
        stopAuto();
      } else {
        scheduleAuto();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const handleMotionChange = (event) => {
      if (event.matches) {
        stopAuto();
      } else {
        scheduleAuto();
      }
    };

    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', handleMotionChange);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(handleMotionChange);
    }
  }

  // Release cards flip interactions
  const releaseCards = document.querySelectorAll('[data-release-card]');
  if (releaseCards.length) {
    const hoverMedia = window.matchMedia('(hover: hover)');
    releaseCards.forEach((card) => {
      const front = card.querySelector('.release-front');
      const closeBtn = card.querySelector('[data-release-close]');
      if (!front) return;

      const setFlipped = (value) => {
        card.classList.toggle('is-flipped', value);
        front.setAttribute('aria-expanded', value ? 'true' : 'false');
      };

      const flipOpen = () => setFlipped(true);
      const flipClose = () => setFlipped(false);

      front.addEventListener('click', (event) => {
        if (hoverMedia.matches) return;
        event.preventDefault();
        flipOpen();
      });

      front.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          flipOpen();
        }
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', (event) => {
          event.preventDefault();
          flipClose();
          if (typeof front.focus === 'function') {
            front.focus({ preventScroll: true });
          }
        });
      }

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && card.classList.contains('is-flipped')) {
          flipClose();
          if (typeof front.focus === 'function') {
            front.focus({ preventScroll: true });
          }
        }
      });

      card.addEventListener('mouseleave', () => {
        if (hoverMedia.matches && !card.contains(document.activeElement)) {
          flipClose();
        }
      });

      if (typeof hoverMedia.addEventListener === 'function') {
        hoverMedia.addEventListener('change', (event) => {
          if (event.matches) {
            flipClose();
          }
        });
      } else if (typeof hoverMedia.addListener === 'function') {
        hoverMedia.addListener((event) => {
          if (event.matches) {
            flipClose();
          }
        });
      }
    });
  }

  // Release filters
  const filters = document.querySelector('.filters');
  const grid = document.querySelector('[data-releases]');
  if (filters && grid) {
    filters.addEventListener('click', (event) => {
      const control = event.target.closest('[data-filter]');
      if (!control) return;
      const type = control.dataset.filter;
      filters.querySelectorAll('.pill').forEach((pill) => {
        pill.classList.toggle('active', pill === control);
      });
      grid.querySelectorAll('[data-type]').forEach((item) => {
        const match = type === 'all' || item.dataset.type === type;
        item.style.display = match ? '' : 'none';
      });
    });
  }

  // YouTube embeds
  const youtubeEmbeds = document.querySelectorAll('[data-youtube]');
  if (youtubeEmbeds.length) {
    let warmedYouTube = false;
    const warmConnections = () => {
      if (warmedYouTube) return;
      warmedYouTube = true;
      const head = document.head || document.getElementsByTagName('head')[0];
      if (!head) return;
      const addLink = (href) => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        if (!href.startsWith(window.location.origin)) {
          link.crossOrigin = '';
        }
        head.appendChild(link);
      };
      ['https://www.youtube.com', 'https://www.google.com', 'https://i.ytimg.com'].forEach(addLink);
    };

    const loadVideo = (container, id, autoplay) => {
      if (container.dataset.embedLoaded === 'true') return;
      const params = autoplay ? '?autoplay=1&rel=0' : '?rel=0';
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}${params}`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';
      container.dataset.embedLoaded = 'true';
      container.classList.remove('video-embed--lite');
      container.classList.add('video-embed--loaded');
      container.innerHTML = '';
      container.appendChild(iframe);
    };

    const getTranslation = (key) => {
      const lang = currentLanguage || defaultLanguage;
      return resolveTranslation(lang, key) ?? resolveTranslation(defaultLanguage, key);
    };

    youtubeEmbeds.forEach((container) => {
      const id = (container.dataset.youtube || '').trim();
      if (!id || id.toUpperCase().startsWith('VIDEO_ID')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'embed-placeholder';
        placeholder.innerHTML = 'Add a YouTube ID to <code>data-youtube</code> to show an embedded player.';
        container.innerHTML = '';
        container.appendChild(placeholder);
        return;
      }

      const poster = (container.dataset.youtubePoster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`).trim();
      container.classList.add('video-embed--lite');
      container.dataset.embedLoaded = 'false';
      container.innerHTML = '';

      const thumb = document.createElement('img');
      thumb.className = 'video-embed__thumb';
      thumb.src = poster;
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      thumb.alt = container.dataset.youtubeAlt || '';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'video-embed__trigger';
      button.dataset.i18n = 'media.videos.playLabel';
      button.dataset.i18nAttr = 'aria-label';

      const icon = document.createElement('span');
      icon.className = 'video-embed__icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = String.fromCharCode(0x25B6);

      const label = document.createElement('span');
      label.className = 'video-embed__text';
      label.dataset.i18n = 'media.videos.playCta';
      label.textContent = getTranslation('media.videos.playCta') || 'Play video';

      const ariaText = getTranslation('media.videos.playLabel') || label.textContent;
      button.setAttribute('aria-label', ariaText);

      button.append(icon, label);
      container.append(thumb, button);

      const activate = (autoplay) => {
        warmConnections();
        loadVideo(container, id, autoplay);
      };

      button.addEventListener('click', (event) => {
        event.preventDefault();
        activate(true);
      });
      button.addEventListener('pointerenter', warmConnections, { once: true });
      button.addEventListener('touchstart', warmConnections, { once: true, passive: true });
      button.addEventListener('focus', warmConnections, { once: true });
      container.addEventListener('pointerenter', warmConnections, { once: true });
    });
  }


  // SoundCloud embeds
  document.querySelectorAll('[data-soundcloud]').forEach((container) => {
    const url = (container.dataset.soundcloud || '').trim();
    if (!url || url.toLowerCase().includes('replace')) {
      container.innerHTML = '<div class="embed-placeholder">Paste a SoundCloud track or mix URL in <code>data-soundcloud</code>.</div>';
      return;
    }
    const truthy = (value, fallback) => {
      if (value === undefined || value === '') return fallback;
      const normalized = value.toString().toLowerCase();
      return !['false', '0', 'no', 'off'].includes(normalized);
    };
    const iframe = document.createElement('iframe');
    const color = container.dataset.soundcloudColor || '#b7a6ff';
    const params = new URLSearchParams();
    params.set('url', url);
    params.set('color', color);
    params.set('auto_play', truthy(container.dataset.soundcloudAutoplay, false) ? 'true' : 'false');
    params.set('hide_related', truthy(container.dataset.soundcloudHideRelated, false) ? 'true' : 'false');
    params.set('show_comments', truthy(container.dataset.soundcloudComments, true) ? 'true' : 'false');
    params.set('show_user', truthy(container.dataset.soundcloudUser, true) ? 'true' : 'false');
    params.set('show_reposts', truthy(container.dataset.soundcloudReposts, false) ? 'true' : 'false');
    params.set('show_teaser', truthy(container.dataset.soundcloudTeaser, false) ? 'true' : 'false');
    const visual = truthy(container.dataset.soundcloudVisual, true);
    params.set('visual', visual ? 'true' : 'false');
    if (!visual) {
      params.set('show_artwork', truthy(container.dataset.soundcloudArtwork, true) ? 'true' : 'false');
      params.set('sharing', truthy(container.dataset.soundcloudSharing, true) ? 'true' : 'false');
      params.set('buying', truthy(container.dataset.soundcloudBuying, false) ? 'true' : 'false');
    }
    iframe.src = `https://w.soundcloud.com/player/?${params.toString()}`;
    iframe.allow = 'autoplay';
    iframe.loading = 'lazy';
    iframe.title = 'SoundCloud audio player';
    const desiredHeight = container.dataset.soundcloudHeight;
    if (desiredHeight) {
      const normalizedHeight = /px$|%$/.test(desiredHeight) ? desiredHeight : `${desiredHeight}px`;
      iframe.height = normalizedHeight;
      iframe.style.minHeight = normalizedHeight;
      container.style.minHeight = normalizedHeight;
      container.style.setProperty('--audio-embed-min', normalizedHeight);
    }
    container.innerHTML = '';
    container.appendChild(iframe);
  });

  // Contact form mailto handling
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const statusEl = contactForm.querySelector('[data-contact-status]');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const subjectValue = (data.get('subject') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const subject = subjectValue || 'Contact request';
      const bodyLines = [
        `Name: ${name || 'N/A'}`,
        `Email: ${email || 'N/A'}`,
        '',
        'Message:',
        message || 'N/A',
      ];
      const body = bodyLines.join('\n');
      const mailto = `mailto:bookings@kizuloge.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      if (statusEl) {
        statusEl.textContent = 'Your email application opened. Please review the details and send the message there.';
        statusEl.hidden = false;
      }
      window.setTimeout(() => {
        try {
          form.reset();
        } catch (error) {
          console.error(error);
        }
      }, 300);
    });
  }

  // Scroll reveal
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('in'));
  }
});
