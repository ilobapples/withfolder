import { Project, Memory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'mockingbird-cover',
    title: 'To Kill a Mockingbird',
    description: 'A comprehensive cover design exploration for Harper Lee’s classic novel, focusing on the symbolic weight of the mockingbird and the radley house.',
    fullContent: 'This project involved a deep dive into the narrative themes of innocence, justice, and childhood perspective. The design process began with raw charcoal sketches (ideation) to capture the gritty reality of the Great Depression era, moving through various digital drafts to find the perfect balance between abstraction and literal representation.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1Jd0ybz4nmfj_i0TAQ-LRaL-ewqJ1HPR2',
    category: 'Book Cover Design',
    year: '2024',
    processImages: [
      { url: 'https://lh3.googleusercontent.com/d/1PZu1eVim_zpLm4-K51F3iQc_62vU42eF', label: 'Ideation & Rough Concepts' },
      { url: 'https://lh3.googleusercontent.com/d/1rOB3KtOYU4VNY4G_Su1M3pOCRD02YFsh', label: 'First Digital Draft' },
      { url: 'https://lh3.googleusercontent.com/d/1Jd0ybz4nmfj_i0TAQ-LRaL-ewqJ1HPR2', label: 'Final Artwork' },
      { url: 'https://lh3.googleusercontent.com/d/1BOIAxd0knkrQkyVtjeKmUgKBK6iefq9w', label: 'Hardcover Mockup' }
    ]
  },
  {
    id: 'oncology-brochure',
    title: 'Oncology Brochure',
    description: 'Professional print collateral designed for a medical oncology conference, balancing technical medical data with a clean, accessible visual hierarchy.',
    fullContent: 'Working with a real-world client in the medical field, the objective was to create a cohesive information packet for an oncology conference. The design emphasizes clarity and trust, utilizing a structured grid to manage dense medical text and schedule information while maintaining a professional and comforting aesthetic. The project included a tri-fold brochure and large-scale exhibition displays.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1X1sbrLYsM9zvzrwdoF9V3s9R9yWvmGvs',
    category: 'Graphic Design',
    year: '2024',
    processImages: [
      { url: 'https://lh3.googleusercontent.com/d/1X1sbrLYsM9zvzrwdoF9V3s9R9yWvmGvs', label: 'Brochure: Cover & Back Panel' },
      { url: 'https://lh3.googleusercontent.com/d/1tnUAc-7npElJi-0RYfjPXPDvKAreopBn', label: 'Brochure: Interior Information Spread' },
      { url: 'https://lh3.googleusercontent.com/d/1mbGseD_LdDuy716ohz254St5Vbc78ndL', label: 'Conference Exhibition Board' }
    ]
  },
  {
    id: 'character-type-design',
    title: 'Character & Type Design',
    description: 'A visual identity and character study for a female Malayali punk rock band, inspired by the predatory botanical forms of the Venus Flytrap.',
    fullContent: 'This project explores character and type design based on the Venus Flytrap plant. I created a female Malayali punk rock band based on that plant, blending organic, aggressive botanical elements with the rebellious spirit of punk culture. The work includes custom typography and detailed character posters for each band member.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1aYoNis4gn2ET4gt-ltwKU7EzReuRtlLF',
    category: 'Illustration & Typography',
    year: '2024',
    processImages: [
      { url: 'https://lh3.googleusercontent.com/d/1aYoNis4gn2ET4gt-ltwKU7EzReuRtlLF', label: 'Final Band Poster' },
      { url: 'https://lh3.googleusercontent.com/d/1lXR3RsdiUhVvT706XyQORFLPeklnjGuo', label: 'Typography & Type Design' },
      { url: 'https://lh3.googleusercontent.com/d/1WnM_md5X4NGJJbO-g5JTkZa_649fOPHX', label: 'Band Member 01 Poster' },
      { url: 'https://lh3.googleusercontent.com/d/1GEUqxzVhbQZN5CeCby5ID5a0gCVznGRo', label: 'Band Member 02 Poster' },
      { url: 'https://lh3.googleusercontent.com/d/1c9E0sD-abOUv2125SXSgljsHycp_QNC-', label: 'Band Member 03 Poster' },
      { url: 'https://lh3.googleusercontent.com/d/1BDPdHeVfJH0jJFS6SPJdExCkuUQLXoWr', label: 'Band Member 04 Poster' },
      { url: 'https://lh3.googleusercontent.com/d/1K3j85_kHifRlneji7jj6_qWIh3WLJzLq', label: 'Band Member 05 Poster' },
      { url: 'https://lh3.googleusercontent.com/d/1d6AdOsv9m_YLs0DYm1SecvOfubP6avsb', label: 'Band Member 06 Poster' }
    ]
  },
  {
    id: 'digital-dreams',
    title: 'Digital Dreams',
    description: 'An exploration of abstract forms in virtual space.',
    fullContent: 'This project began as a study of how light interacts with non-Euclidean geometry. Using a combination of custom shaders and procedural generation, I created a series of works that challenge the viewer\'s perception of depth and reality.',
    imageUrl: 'https://picsum.photos/seed/p1/800/600',
    category: 'Digital Art',
    year: '2023',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/4v9S1N6m9fS6vUq3xXQZfE'
  },
  {
    id: 'urban-echoes',
    title: 'Urban Echoes',
    description: 'Capturing the hidden rhythms of city life through illustration.',
    fullContent: 'Urban Echoes is an ongoing series of street-level illustrations. Each piece is drawn on-site, capturing the fleeting moments of connection and isolation in dense metropolitan environments.',
    imageUrl: 'https://picsum.photos/seed/p2/800/600',
    category: 'Illustration',
    year: '2024',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8Ueb9WJR3oR'
  },
  {
    id: 'synth-waves',
    title: 'Synth Waves',
    description: 'Audio-visual experiments synced to electronic beats.',
    fullContent: 'A collaboration with electronic music producers to create responsive visual environments. The motion is driven by FFT analysis of the audio signal, creating a seamless fusion of sound and sight.',
    imageUrl: 'https://picsum.photos/seed/p3/800/600',
    category: 'Interactive',
    year: '2023',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/track/4cOdK2wGZSTM2Of9737qyN'
  }
];

export const ARCHIVE_PROJECTS = [
  {
    id: 'character-walk-cycle',
    title: 'Character Design & Walk Cycle',
    year: '2023',
    description: 'Experimental character study focusing on locomotion and anatomical silhouette.',
    assets: [
      { type: 'image', url: 'https://lh3.googleusercontent.com/d/1TGmR3IrzKq5cutr6OXty7BB2fz6ywvWt', label: 'Character_Design_Sheet' },
      { type: 'image', url: 'https://lh3.googleusercontent.com/d/13dsy1zBeWRbFk0C-UsSAg32fEwMX5w53', label: 'Walk_Cycle_Breakdown' },
      { type: 'video', url: 'https://drive.google.com/file/d/19aRR3JZ8J_ggTc5wWGf22FwAZmlMY8SZ/preview', label: 'Locomotion_Loop' }
    ]
  },
  {
    id: 'digital-zine',
    title: 'Digital Zine Publication',
    year: '2024',
    description: 'An interactive flippable zine exploration of digital collages and fragmented narratives.',
    assets: [
      { 
        type: 'zine', 
        url: 'https://heyzine.com/flip-book/b624c5b39a.html', 
        thumbnailUrl: 'https://heyzine.com/cover/b624c5b39a.jpg',
        label: 'Interactive_Publication_V1' 
      }
    ]
  }
];

export const NARRATIVE_STORY = [
  { id: 'narrative-1', url: 'https://lh3.googleusercontent.com/d/1e7xvkEspQCFnPck--_gQqnAkvQEh4yQx', caption: 'Step I' },
  { id: 'narrative-2', url: 'https://lh3.googleusercontent.com/d/1ZggYiil-nibHaJGQHz7Yp505nMIbj3ew', caption: 'Step II' },
  { id: 'narrative-3', url: 'https://lh3.googleusercontent.com/d/1c9QK2wE8WpcIgqRZ2EQF53TIWE9vnwrt', caption: 'Step III' },
  { id: 'narrative-4', url: 'https://lh3.googleusercontent.com/d/1wMSlGYWJiG4u2Q1RKS_u4TkvMU_NEguH', caption: 'Step IV' },
];

export const MEMORIES: Memory[] = [
  { id: 'm1', url: 'https://lh3.googleusercontent.com/d/1yqc2K8m-XGp8yTrBajsn6KKG9Pnaafpd', caption: 'Captured Moment 01' },
  { id: 'm2', url: 'https://lh3.googleusercontent.com/d/1Ww3TTIze36N3iwHUA5MhqTDyB22R29SM', caption: 'Captured Moment 02' },
  { id: 'm3', url: 'https://lh3.googleusercontent.com/d/1rTsEUF5pwGCLyJMej1djAaGkeVXOdlia', caption: 'Captured Moment 03' },
  { id: 'm4', url: 'https://lh3.googleusercontent.com/d/1zK3vWmM0QMWCiXOTeuHc7voYkfZTyfRq', caption: 'Captured Moment 04' },
  { id: 'm5', url: 'https://lh3.googleusercontent.com/d/1h8hPErptot-flKEWFtPcDgQ4Ws5hJr3N', caption: 'Captured Moment 05' },
  { id: 'm6', url: 'https://lh3.googleusercontent.com/d/1heqHJjTnH1oEQxDjhUTyjBwlUHGcl-6', caption: 'Captured Moment 06' },
  { id: 'm7', url: 'https://lh3.googleusercontent.com/d/1hSJB9EOZJ0kn9I7b1UL9bgszIeWLZMbG', caption: 'Captured Moment 07' },
];

export const LANGUAGES = ["Kimaya", "കിമായ", "கிமாயா", "किமாயാ"];