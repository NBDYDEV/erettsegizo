import { AchivementsImagesApiResponse, AchivementsImagesData, ApiResponse, FooterApiResponse, FooterData, HomeData, HowItWorksApiResponse, HowItWorksData, ReviewApiResponse, ReviewData, TeamApiResponse, TeamData } from "./types";

// Revalidate idő (másodpercben)
// 60 = 1 perc, 300 = 5 perc, 3600 = 1 óra
const REVALIDATE_TIME = 300; // 5 perc

export async function getHomeData(): Promise<HomeData | null> {
    const apiUrl = process.env.API_home_URL;

    if (!apiUrl) {
        console.warn("API_home_URL is not defined in environment variables");
        return null;
    }

    try {
        // ISR (Incremental Static Regeneration) használata no-store helyett
        const res = await fetch(apiUrl, { 
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!res.ok) {
            console.error(`Failed to fetch home data: ${res.status} ${res.statusText}`);
            return null;
        }

        const json: ApiResponse = await res.json();

        if (json.data && json.data.length > 0) {
            return json.data[0];
        }

        return null;
    } catch (error) {
        console.error("Error fetching home data:", error);
        return null;
    }
}


export async function getTeamData(): Promise<TeamData[] | null> {
    const apiUrl = process.env.API_team_URL;

    if (!apiUrl) {
        console.warn("API_team_URL is not defined in environment variables");
        return null;
    }

    try {
        const res = await fetch(apiUrl, { 
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!res.ok) {
            console.error(`Failed to fetch team data: ${res.status} ${res.statusText}`);
            return null;
        }

        const json: TeamApiResponse = await res.json();
        if (json.data && json.data.length > 0) {
            return json.data;
        }

        return null;
    } catch (error) {
        console.error("Error fetching team data:", error);
        return null;
    }
}

export async function getHowItWorksData(): Promise<HowItWorksData[] | null> {
    const apiUrl = process.env.API_how_it_works_URL;

    if (!apiUrl) {
        console.warn("API_how_it_works_URL is not defined in environment variables");
        return null;
    }

    try {
        const res = await fetch(apiUrl, { 
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!res.ok) {
            console.error(`Failed to fetch how it works data: ${res.status} ${res.statusText}`);
            return null;
        }

        const json: HowItWorksApiResponse = await res.json();
        if (json.data && json.data.length > 0) {
            return json.data;
        }

        return null;
    } catch (error) {
        console.error("Error fetching how it works data:", error);
        return null;
    }
}

export async function getReviewsData(): Promise<ReviewData[] | null> {
    const apiUrl = process.env.API_reviews_URL;

    if (!apiUrl) {
        console.warn("API_reviews_URL is not defined in environment variables");
        return null;
    }

    try {
        const res = await fetch(apiUrl, { 
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!res.ok) {
            console.error(`Failed to fetch reviews data: ${res.status} ${res.statusText}`);
            return null;
        }

        const json: ReviewApiResponse = await res.json();
        if (json.data && json.data.length > 0) {
            return json.data;
        }

        return null;
    } catch (error) {
        console.error("Error fetching reviews data:", error);
        return null;
    }
}


export async function getAchivementsImages(): Promise<AchivementsImagesData[] | null> {
    const apiUrl = process.env.API_achivements_images_URL;

    if (!apiUrl) {
        console.warn("API_achivements_images_URL is not defined in environment variables");
        return null;
    }

    try {
        const res = await fetch(apiUrl, { 
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!res.ok) {
            console.error(`Failed to fetch achievements images: ${res.status} ${res.statusText}`);
            return null;
        }

        const json: AchivementsImagesApiResponse = await res.json();
        if (json.data && json.data.length > 0) {
            return json.data;
        }

        return null;
    } catch (error) {
        console.error("Error fetching achievements images:", error);
        return null;
    }
}


export async function getFooterData(): Promise<FooterData[] | null> {
    const apiUrl = process.env.API_footer_URL;

    if (!apiUrl) {
        console.warn("API_footer_URL is not defined in environment variables");
        return null;
    }

    try {
        const res = await fetch(apiUrl, { 
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!res.ok) {
            console.error(`Failed to fetch footer data: ${res.status} ${res.statusText}`);
            return null;
        }

        const json: FooterApiResponse = await res.json();
        if (json.data && json.data.length > 0) {
            return json.data;
        }

        return null;
    } catch (error) {
        console.error("Error fetching footer data:", error);
        return null;
    }
}