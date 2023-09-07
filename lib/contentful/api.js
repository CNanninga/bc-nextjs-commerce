const QUERY_CATEGORY_CONTENT = `
query CategoryContentCollection($slug: String) {
    categoryContentCollection(where: {slug: $slug}, limit: 1) {
        items {
            contentCollection(limit: 10) {
                items {
                    __typename
                    ... on BlockBanner {
                        heading
                        imagePosition
                        backgroundColor
                        style
                        content {
                            json
                        }
                        image {
                            title
                            description
                            url
                        }
                    }
                    ... on BlockRichText {
                        content {
                            json
                            links {
                                assets {
                                    block {
                                        title
                                        description
                                        url
                                        sys {
                                            id
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`;

const extractCategoryContent = (responseData) => {
  return responseData?.data?.categoryContentCollection?.items?.[0]?.contentCollection?.items;
};

async function fetchGraphQL(query, variables, cache = 'force-cache') {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache
    }
  ).then((response) => response.json());
}

export async function getCategoryContent(slug) {
  const category = await fetchGraphQL(QUERY_CATEGORY_CONTENT, { slug });
  return extractCategoryContent(category);
}
