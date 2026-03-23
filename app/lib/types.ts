export interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface ImageAttributes {
    id: number;
    name: string;
    width: number;
    height: number;
    url: string;
    formats: {
        thumbnail: ImageFormat;
        small: ImageFormat;
        medium: ImageFormat;
        large: ImageFormat;
    };
}

export interface Review {
    name: string;
    review: string;
    from: string;
    image: string;
}

export interface HowItWorks {
    title: string;
    description: string;
    href: string;
    linkText: string;
    image: string;
}

export interface HomeData {
    id: number;
    hero_title: string;
    hero_text: string;
    hero_image: ImageAttributes;
    introduce_title: string;
    introduce_text: string;
    introduce_vid: any;
    achivements_images: ImageAttributes[];
    reviews: Review[];
    how_it_works: HowItWorks[];
}

export interface ApiResponse {
    data: HomeData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}


export interface TeamData {
    id: number;
    name: string;
    position: string;
    image: ImageAttributes;
}

export interface TeamApiResponse {
    data: TeamData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface HowItWorksData {
    id: number;
    title: string;
    description: string;
    href: string;
    linkText: string;
    image: ImageAttributes;
}

export interface HowItWorksApiResponse {
    data: HowItWorksData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}


export interface ReviewData {
    id: number;
    name: string;
    review: string;
    social_media: string;
    avatar: ImageAttributes;
}

export interface ReviewApiResponse {
    data: ReviewData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface AchivementsImagesData {
    id: number;
    middle_circle: ImageAttributes;
    top_circle: ImageAttributes;
    bottom_circle: ImageAttributes;
    left_circle: ImageAttributes;
    right_circle: ImageAttributes;
}

export interface AchivementsImagesApiResponse {
    data: AchivementsImagesData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface FooterData {
    id: number;
    logo: ImageAttributes;
    description: string;
    address: string;
    phone: string;
    navigation: string[];
    links: string[];
    copyright: string;
    gdpr: ImageAttributes;
    ToS: ImageAttributes;
}

export interface FooterApiResponse {
    data: FooterData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}