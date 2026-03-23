export function resolveHomeImageUrl(url?: string | null) {
    const apiUrl = process.env.API_home_URL;
    const apiBase = apiUrl ? new URL(apiUrl).origin : "";
    if (!url) return null;

    if (url.startsWith('http')) {
        return url;
    }

    return `${apiBase}${url}`;
}

export function resolveTeamImageUrl(url?: string | null) {
    const apiUrl = process.env.API_team_URL;
    const apiBase = apiUrl ? new URL(apiUrl).origin : "";
    if (!url) return null;

    if (url.startsWith('http')) {
        return url;
    }

    return `${apiBase}${url}`;
}

export function resolveHowItWorksImageUrl(url?: string | null) {
    const apiUrl = process.env.API_how_it_works_URL;
    const apiBase = apiUrl ? new URL(apiUrl).origin : "";
    if (!url) return null;

    if (url.startsWith('http')) {
        return url;
    }

    return `${apiBase}${url}`;
}


export function resolveReviewsImageUrl(url?: string | null) {
    const apiUrl = process.env.API_reviews_URL;
    const apiBase = apiUrl ? new URL(apiUrl).origin : "";
    if (!url) return null;

    if (url.startsWith('http')) {
        return url;
    }

    return `${apiBase}${url}`;
}


export function resolveAchiementsImagesUrl(url?: string | null) {
    const apiUrl = process.env.API_achivements_images_URL;
    const apiBase = apiUrl ? new URL(apiUrl).origin : "";
    if (!url) return null;

    if (url.startsWith('http')) {
        return url;
    }

    return `${apiBase}${url}`;
}

export function resolveDocumentUrl(url?: string | null) {
    const apiUrl = process.env.API_footer_URL;
    const apiBase = apiUrl ? new URL(apiUrl).origin : "";
    if (!url) return null;

    if (url.startsWith('http')) {
        return url;
    }

    return `${apiBase}${url}`;
}