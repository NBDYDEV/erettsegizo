import React from "react";

interface SchemaOrgProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: Record<string, any> | Record<string, any>[];
}

export default function SchemaOrg({ schema }: SchemaOrgProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
