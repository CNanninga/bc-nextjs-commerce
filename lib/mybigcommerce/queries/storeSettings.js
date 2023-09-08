export const getStoreSettingsQuery = `
query Site {
    site {
        settings {
            storeName
            logoV2 {
                ... on StoreImageLogo {
                    image {
                        url(width: 500)
                        urlOriginal
                        altText
                    }
                }
            }
        }
    }
}
`;
