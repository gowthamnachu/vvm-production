// Comprehensive JSON-LD Structured Data for SEO
// Covers: School, LocalBusiness, FAQPage, Facilities, Testimonials, Breadcrumbs, Events

export function SchoolStructuredData() {
  const baseUrl = "https://vagdevividyamandir.com";

  // 1. Main School / EducationalOrganization schema
  const schoolSchema = {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization"],
    "@id": `${baseUrl}/#school`,
    name: "Vagdevi Vidya Mandir",
    alternateName: ["VVM", "Vagdevi Vidya Mandir School", "VVM School Visakhapatnam"],
    url: baseUrl,
    logo: `${baseUrl}/vvvm_logo.jpg`,
    image: [
      `${baseUrl}/vvvm_logo.jpg`,
      `${baseUrl}/aboutus.png`,
      `${baseUrl}/children.png`,
    ],
    description:
      "Vagdevi Vidya Mandir is an AP Govt recognized school in Visakhapatnam, Andhra Pradesh, offering holistic education with world-class facilities including skating, karate, boxing, dance, sports, and academics since 2002. Located in Gambheeram village near Anandapuram.",
    foundingDate: "2002",
    slogan: "A Place Where Knowledge Meets Excellence!",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 50,
      unitText: "qualified faculty members",
    },
    alumni: {
      "@type": "QuantitativeValue",
      value: 5000,
      unitText: "alumni",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gambheeram Village, Boyapalem Post",
      addressLocality: "Anandapuram",
      addressRegion: "Andhra Pradesh",
      postalCode: "531163",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.8167,
      longitude: 83.2833,
    },
    telephone: ["+91-7680097953", "+91-9490670461"],
    email: "info@vagdevidyamandir.com",
    sameAs: [
      "https://www.instagram.com/vagdevidya_mandir",
      "https://www.youtube.com/@vagdevividyamandir4209",
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Visakhapatnam",
        "@id": "https://en.wikipedia.org/wiki/Visakhapatnam",
      },
      {
        "@type": "AdministrativeArea",
        name: "Anandapuram",
      },
      {
        "@type": "AdministrativeArea",
        name: "Gambheeram",
      },
      {
        "@type": "AdministrativeArea",
        name: "Boyapalem",
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "AP Government Recognized School",
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "Andhra Pradesh State Government",
      },
    },
    educationalLevel: [
      "Pre-Primary",
      "Primary School",
      "Middle School",
      "High School (SSC)",
    ],
    teaches: [
      "English",
      "Telugu",
      "Hindi",
      "Mathematics",
      "Science",
      "Social Studies",
      "Physical Education",
      "Yoga",
      "Dance",
      "Skating",
      "Karate",
      "Boxing",
      "Sports",
    ],
    founder: {
      "@type": "Person",
      name: "Ramineni Radha Krishna",
      jobTitle: "Correspondent",
      description:
        "Visionary educationist leading Vagdevi Vidya Mandir for over 25 years, shaping over 5000 lives through quality education.",
      image: `${baseUrl}/aboutus.png`,
      worksFor: {
        "@id": `${baseUrl}/#school`,
      },
    },
    employee: [
      {
        "@type": "Person",
        name: "Pasumarthi Sudha Rani",
        jobTitle: "Director",
        description: "Leading Vagdevi Vidya Mandir with 24 years of experience, nurturing academic brilliance and moral values.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/Pasumarthi%20Sudha%20Rani.png`,
      },
      {
        "@type": "Person",
        name: "Vijjapu Devi",
        jobTitle: "English Teacher",
        description: "22 years of teaching experience. Nurturing academic excellence and strong character in students at VVM.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/VIJJAPU%20%20DEVI.png`,
      },
      {
        "@type": "Person",
        name: "Gampala Bhaskara Rao",
        jobTitle: "Primary Telugu Teacher",
        description: "16 years of experience instilling a love for Telugu in young learners at Vagdevi Vidya Mandir.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/GAMPALA%20BHASKARA%20RAO.png`,
      },
      {
        "@type": "Person",
        name: "Radha Rani Agarwal",
        jobTitle: "Hindi Teacher",
        description: "22 years of Hindi teaching. Helping students connect with cultural heritage and build communication skills.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/RADHA%20RANI%20AGARWAL.png`,
      },
      {
        "@type": "Person",
        name: "Kandukuri Satya Veni",
        jobTitle: "Science Teacher",
        description: "21 years of teaching science with hands-on laboratory experiences at VVM, Visakhapatnam.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/KANDUKURI%20SATYA%20VENI.png`,
      },
      {
        "@type": "Person",
        name: "Kotinadham Vasundhara Devi",
        jobTitle: "Higher Mathematics Teacher",
        description: "19 years of experience teaching advanced mathematics. Empowering students to become responsible citizens.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/KOTINADHAM%20VASUNDHARA%20DEVI.png`,
      },
      {
        "@type": "Person",
        name: "Dalli Sharmila",
        jobTitle: "Mother Teacher",
        description: "14 years of experience emphasizing creative expression and critical thinking at Vagdevi Vidya Mandir.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/DALLI%20SHARMILA.png`,
      },
      {
        "@type": "Person",
        name: "Addepalli Krishna Kumari",
        jobTitle: "Pre-Primary Teacher",
        description: "12 years nurturing young minds with a strong foundation of curiosity, confidence, and love for learning.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/ADDEPALLI%20%20%20%20KRISHNA%20%20%20%20KUMARI.png`,
      },
      {
        "@type": "Person",
        name: "Munagapati Ambica",
        jobTitle: "Higher English Teacher",
        description: "11 years of enriching teaching experience. Committed to academic brilliance and moral values at VVM.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/MUNAGAPATI%20%20%20AMBICA.png`,
      },
      {
        "@type": "Person",
        name: "Gampala Vijayasree",
        jobTitle: "Telugu Teacher",
        description: "10 years of Telugu language and literature teaching, inspiring cultural heritage at Vagdevi Vidya Mandir.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/GAMPALA%20VIJAYASREE.png`,
      },
      {
        "@type": "Person",
        name: "Yoga Sir",
        jobTitle: "Physical Education & Yoga Instructor",
        description: "Teaching yoga, discipline, mindfulness, and resilience through physical education at VVM, Visakhapatnam.",
        worksFor: { "@id": `${baseUrl}/#school` },
        image: `${baseUrl}/testmonials/yoga.png`,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      reviewCount: "150",
      ratingCount: "150",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "16:00",
    },
  };

  // 2. LocalBusiness schema (helps with Maps and local search)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: "Vagdevi Vidya Mandir",
    image: `${baseUrl}/vvvm_logo.jpg`,
    url: baseUrl,
    telephone: "+91-7680097953",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gambheeram Village, Boyapalem Post",
      addressLocality: "Anandapuram, Visakhapatnam",
      addressRegion: "Andhra Pradesh",
      postalCode: "531163",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.8167,
      longitude: 83.2833,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "16:00",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      reviewCount: "150",
    },
  };

  // 3. Facilities as OfferCatalog (makes activities searchable)
  const facilitiesSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${baseUrl}/#facilities`,
    name: "School Facilities & Activities at Vagdevi Vidya Mandir",
    description:
      "World-class infrastructure and extracurricular facilities at Vagdevi Vidya Mandir, Visakhapatnam, including skating, karate, boxing, dance, sports grounds, science labs, smart classrooms, and more.",
    provider: { "@id": `${baseUrl}/#school` },
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Skating Facility",
          description:
            "Professional skating rink and training for students at Vagdevi Vidya Mandir, Visakhapatnam. Learn roller skating as part of school extracurricular activities.",
          image: `${baseUrl}/gallery/skating/MSP02452.JPG`,
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Sports & Physical Education",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Karate & Boxing Training",
          description:
            "Professional martial arts training including karate and boxing for students at Vagdevi Vidya Mandir, Visakhapatnam. Build strength, discipline and self-defense skills.",
          image: `${baseUrl}/gallery/karate&Boxing/MSP02277.JPG`,
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Sports & Martial Arts",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dance Programs",
          description:
            "Classical and contemporary dance training for students at Vagdevi Vidya Mandir, Visakhapatnam. Nurture creativity and cultural expression through dance.",
          image: `${baseUrl}/gallery/dance/MSP02529.JPG`,
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Arts & Culture",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sports Ground & Athletics",
          description:
            "Expansive playground and sports facilities for athletics, cricket, basketball, and outdoor games at Vagdevi Vidya Mandir. Promoting physical fitness and teamwork.",
          image: `${baseUrl}/gallery/sports/MSP02383.JPG`,
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Sports & Physical Education",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Smart Classrooms",
          description:
            "Technology-enabled smart classrooms with digital learning tools at Vagdevi Vidya Mandir for interactive and modern education.",
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Academic Infrastructure",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Science Laboratories",
          description:
            "State-of-the-art science labs for physics, chemistry, and biology practicals at Vagdevi Vidya Mandir. Hands-on learning to inspire young scientists.",
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Academic Infrastructure",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Computer Lab",
          description:
            "Modern computer laboratory with internet access for digital literacy and computer education at Vagdevi Vidya Mandir.",
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Academic Infrastructure",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Library",
          description:
            "Well-stocked school library with books across all subjects, literature, encyclopedia, and reference materials at Vagdevi Vidya Mandir.",
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Academic Infrastructure",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Yoga & Meditation",
          description:
            "Daily yoga and meditation sessions for mental and physical well-being of students at Vagdevi Vidya Mandir, Visakhapatnam.",
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Health & Wellness",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Green Campus & Playground",
          description:
            "Sprawling green campus surrounded by lush vegetation with large open playgrounds for outdoor activities at Vagdevi Vidya Mandir, Anandapuram.",
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Campus Environment",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transport Facility",
          description:
            "Safe and reliable school bus transport service covering Visakhapatnam, Anandapuram, Gambheeram, and surrounding areas.",
          provider: { "@id": `${baseUrl}/#school` },
          areaServed: "Visakhapatnam, Andhra Pradesh",
          category: "Student Services",
        },
      },
    ],
  };

  // 4. Teacher / Faculty schema (indexes all teachers)
  const teacherSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${baseUrl}/#faculty`,
    name: "Vagdevi Vidya Mandir — Faculty",
    description:
      "Meet the experienced and dedicated teaching faculty at Vagdevi Vidya Mandir, Visakhapatnam. Our teachers bring 10-24 years of expertise across English, Telugu, Hindi, Science, Mathematics, Pre-Primary, Physical Education, and Yoga.",
    url: `${baseUrl}/testimonials`,
    member: [
      {
        "@type": "Person",
        name: "Pasumarthi Sudha Rani",
        jobTitle: "Director",
        description: "24 years of experience leading Vagdevi Vidya Mandir with a commitment to nurturing academic brilliance and moral values.",
        image: `${baseUrl}/testmonials/Pasumarthi%20Sudha%20Rani.png`,
      },
      {
        "@type": "Person",
        name: "Vijjapu Devi",
        jobTitle: "English Teacher",
        description: "22 years of teaching experience fostering academic excellence and strong character development at VVM.",
        image: `${baseUrl}/testmonials/VIJJAPU%20%20DEVI.png`,
      },
      {
        "@type": "Person",
        name: "Gampala Bhaskara Rao",
        jobTitle: "Primary Telugu Teacher",
        description: "16 years of experience instilling a love for Telugu language in young learners at Vagdevi Vidya Mandir.",
        image: `${baseUrl}/testmonials/GAMPALA%20BHASKARA%20RAO.png`,
      },
      {
        "@type": "Person",
        name: "Radha Rani Agarwal",
        jobTitle: "Hindi Teacher",
        description: "22 years of Hindi teaching experience, helping students connect with cultural heritage and communication skills.",
        image: `${baseUrl}/testmonials/RADHA%20RANI%20AGARWAL.png`,
      },
      {
        "@type": "Person",
        name: "Kandukuri Satya Veni",
        jobTitle: "Science Teacher",
        description: "21 years of science teaching with hands-on laboratory experiences and innovative methods at VVM.",
        image: `${baseUrl}/testmonials/KANDUKURI%20SATYA%20VENI.png`,
      },
      {
        "@type": "Person",
        name: "Kotinadham Vasundhara Devi",
        jobTitle: "Higher Mathematics Teacher",
        description: "19 years of higher mathematics teaching, empowering students to develop analytical and problem-solving skills.",
        image: `${baseUrl}/testmonials/KOTINADHAM%20VASUNDHARA%20DEVI.png`,
      },
      {
        "@type": "Person",
        name: "Dalli Sharmila",
        jobTitle: "Mother Teacher",
        description: "14 years of experience emphasizing creative expression and critical thinking in young learners.",
        image: `${baseUrl}/testmonials/DALLI%20SHARMILA.png`,
      },
      {
        "@type": "Person",
        name: "Addepalli Krishna Kumari",
        jobTitle: "Pre-Primary Teacher",
        description: "12 years nurturing early learners with curiosity, confidence, and a lifelong love for learning at VVM.",
        image: `${baseUrl}/testmonials/ADDEPALLI%20%20%20%20KRISHNA%20%20%20%20KUMARI.png`,
      },
      {
        "@type": "Person",
        name: "Munagapati Ambica",
        jobTitle: "Higher English Teacher",
        description: "11 years of enriching English teaching, committed to academic brilliance and moral values at VVM.",
        image: `${baseUrl}/testmonials/MUNAGAPATI%20%20%20AMBICA.png`,
      },
      {
        "@type": "Person",
        name: "Gampala Vijayasree",
        jobTitle: "Telugu Teacher",
        description: "10 years of Telugu literature teaching, inspiring cultural heritage appreciation at Vagdevi Vidya Mandir.",
        image: `${baseUrl}/testmonials/GAMPALA%20VIJAYASREE.png`,
      },
      {
        "@type": "Person",
        name: "Yoga Sir",
        jobTitle: "Physical Education & Yoga Instructor",
        description: "Teaching yoga, mindfulness, discipline, and physical fitness to students at VVM, Visakhapatnam.",
        image: `${baseUrl}/testmonials/yoga.png`,
      },
    ],
  };

  // 5. FAQ Schema (common search queries for schools)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What facilities does Vagdevi Vidya Mandir offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vagdevi Vidya Mandir offers world-class facilities including skating rink, karate and boxing training, dance programs, expansive sports grounds, smart classrooms, science laboratories, computer lab, library, yoga and meditation sessions, and a sprawling green campus with large playgrounds.",
        },
      },
      {
        "@type": "Question",
        name: "Does Vagdevi Vidya Mandir have skating facility?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Vagdevi Vidya Mandir has a professional skating facility where students receive roller skating training as part of the school's extracurricular activities. The skating program helps develop balance, coordination, and confidence.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I choose Vagdevi Vidya Mandir for my child?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vagdevi Vidya Mandir stands apart with four key differentiators: (1) 25+ Years Legacy — over two decades of trust, excellence, and proven results since 2002 with 5000+ alumni, (2) SSC Curriculum — AP Government recognized with experienced faculty of up to 24 years, (3) Green Campus — lush green campus in Gambheeram village away from city pollution with expansive playgrounds, (4) Holistic Growth — equal focus on academics, sports (skating, karate, boxing), arts (dance), yoga, and character building for well-rounded development.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Vagdevi Vidya Mandir located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vagdevi Vidya Mandir is located in Gambheeram Village, Boyapalem Post, Anandapuram Mandal, Visakhapatnam District, Andhra Pradesh - 531163. The school is easily accessible from Visakhapatnam city and surrounding areas.",
        },
      },
      {
        "@type": "Question",
        name: "What is the admission process at Vagdevi Vidya Mandir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The admission process at VVM involves 5 simple steps: 1) Inquiry - reach out for information, 2) Application - submit the admission form, 3) Interaction - parent-teacher interaction session, 4) Assessment - student assessment, 5) Confirmation - enrollment confirmation. Contact us at +91-7680097953 or visit our campus.",
        },
      },
      {
        "@type": "Question",
        name: "Is Vagdevi Vidya Mandir a government recognized school?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Vagdevi Vidya Mandir is an AP (Andhra Pradesh) Government recognized school. Established in 2002, the school follows the SSC curriculum and has been providing quality education for over 25 years.",
        },
      },
      {
        "@type": "Question",
        name: "Does the school offer karate and boxing training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Vagdevi Vidya Mandir offers professional karate and boxing training as part of its comprehensive extracurricular program. These martial arts build strength, discipline, self-defense skills, and confidence in students.",
        },
      },
      {
        "@type": "Question",
        name: "What makes Vagdevi Vidya Mandir different from other schools in Visakhapatnam?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VVM stands apart with its sprawling green campus, emphasis on physical activities alongside academics, 25+ years of excellence, 5000+ alumni, experienced faculty with up to 24 years of experience, and holistic development approach covering academics, sports (skating, karate, boxing, dance), yoga, cultural activities, and strong moral values.",
        },
      },
      {
        "@type": "Question",
        name: "Does Vagdevi Vidya Mandir have transport facility?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Vagdevi Vidya Mandir provides safe and reliable school bus transport covering Visakhapatnam, Anandapuram, Gambheeram, and surrounding areas. Contact +91-7680097953 for transport route details.",
        },
      },
      {
        "@type": "Question",
        name: "What curriculum does Vagdevi Vidya Mandir follow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vagdevi Vidya Mandir follows the SSC (Secondary School Certificate) curriculum recognized by the Andhra Pradesh State Government. The school offers classes from Pre-Primary through Class 10 (High School).",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Vagdevi Vidya Mandir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Vagdevi Vidya Mandir via phone at +91-7680097953 or +91-9490670461, email at info@vagdevidyamandir.com, WhatsApp, or visit the campus at Gambheeram Village, Anandapuram, Visakhapatnam - 531163.",
        },
      },
    ],
  };

  // 6. BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Foreword", item: `${baseUrl}/foreword` },
      { "@type": "ListItem", position: 3, name: "Facilities", item: `${baseUrl}/features` },
      { "@type": "ListItem", position: 4, name: "Admissions", item: `${baseUrl}/admissions` },
      { "@type": "ListItem", position: 5, name: "Testimonials", item: `${baseUrl}/testimonials` },
      { "@type": "ListItem", position: 6, name: "Gallery", item: `${baseUrl}/gallery` },
      { "@type": "ListItem", position: 7, name: "About Us", item: `${baseUrl}/about` },
      { "@type": "ListItem", position: 8, name: "Contact", item: `${baseUrl}/contact` },
    ],
  };

  // 7. WebSite schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Vagdevi Vidya Mandir",
    description: "Official website of Vagdevi Vidya Mandir school, Visakhapatnam, Andhra Pradesh.",
    publisher: { "@id": `${baseUrl}/#school` },
    inLanguage: ["en", "te"],
  };

  // 8. Event schema for Admissions Open
  const admissionEventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Admissions Open 2026-27 — Vagdevi Vidya Mandir",
    description:
      "Admissions are now open for the academic year 2026-27 at Vagdevi Vidya Mandir, Visakhapatnam. Enroll your child from Pre-Primary to Class 10. Apply now!",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Vagdevi Vidya Mandir",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gambheeram Village, Boyapalem Post",
        addressLocality: "Anandapuram, Visakhapatnam",
        addressRegion: "Andhra Pradesh",
        postalCode: "531163",
        addressCountry: "IN",
      },
    },
    organizer: { "@id": `${baseUrl}/#school` },
    image: `${baseUrl}/children.png`,
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/admissions`,
      availability: "https://schema.org/InStock",
      description: "Admission available for Pre-Primary to Class 10",
    },
  };

  // 9. ImageGallery schema
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Vagdevi Vidya Mandir Campus & Activities Gallery",
    description:
      "Photo gallery showcasing dance performances, karate & boxing training, skating, sports activities, and campus life at Vagdevi Vidya Mandir, Visakhapatnam.",
    url: `${baseUrl}/gallery`,
    about: { "@id": `${baseUrl}/#school` },
    image: [
      `${baseUrl}/gallery/dance/MSP02529.JPG`,
      `${baseUrl}/gallery/karate&Boxing/MSP02277.JPG`,
      `${baseUrl}/gallery/skating/MSP02452.JPG`,
      `${baseUrl}/gallery/sports/MSP02383.JPG`,
    ],
  };

  // 10. Why Choose Us — ItemList schema (value propositions)
  const whyChooseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/#whychoose`,
    name: "Why Choose Vagdevi Vidya Mandir",
    description:
      "Key reasons to choose Vagdevi Vidya Mandir, one of the best schools in Visakhapatnam, Andhra Pradesh — 25+ years legacy, SSC curriculum, green campus, and holistic student development.",
    url: `${baseUrl}/features`,
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "25+ Years Legacy",
        description:
          "Over two decades of trust, excellence, and proven results in holistic education since 2002. Vagdevi Vidya Mandir has shaped 5000+ successful alumni with strong academic foundations and moral values in Visakhapatnam.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "SSC Curriculum — AP Government Recognized",
        description:
          "Recognized by Andhra Pradesh Government with a structured state-board SSC academic framework from Pre-Primary to Class 10. Taught by 50+ experienced faculty members with up to 24 years of teaching excellence.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Green Campus in Gambheeram, Visakhapatnam",
        description:
          "Lush green campus surrounded by nature in Gambheeram village, Anandapuram, Visakhapatnam — away from city pollution. Expansive playgrounds for physical activity and mental well-being of students.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Holistic Growth — Academics, Sports & Arts",
        description:
          "Equal focus on academics, sports, arts, and character building for well-rounded development. World-class facilities including skating, karate, boxing, dance, yoga, smart classrooms, and science laboratories.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(facilitiesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teacherSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(admissionEventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whyChooseSchema) }}
      />
    </>
  );
}
