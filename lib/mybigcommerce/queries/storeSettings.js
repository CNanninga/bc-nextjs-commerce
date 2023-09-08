export const getStoreSettingsQuery = `
query Site {
    site {
        settings {
            storeName
            logoV2 {
                __typename
                ... on StoreImageLogo {
                    image {
                        url(width: 500)
                        urlOriginal
                        altText
                    }
                }
                ... on StoreTextLogo {
                    text
                }
            }
        }
    }
}
`;
