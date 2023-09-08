const QUERY_CONTENT = `
query ContentCollection(
  $type: String
  $slug: String
) {
    categoryContentCollection(
      where: {slug: $slug, type: $type}, 
      limit: 1
    ) {
        items {
            contentCollection(limit: 10) {
                items {
                    __typename
                    ... on BlockBanner {
                        sys {
                            id
                        }
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
                        sys {
                            id
                        }
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
                    ... on BlockSimpleText {
                        sys {
                            id
                        }
                        size
                        content {
                            json
                        }
                    }
                    ... on BlockImage {
                        sys {
                            id
                        }
                        size
                        image {
                            title
                            description
                            url
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
  const fetchOpts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      ...(query && { query }),
      ...(variables && { variables })
    })
  };
  if (cache !== 'no-store') {
    fetchOpts.next = {
      revalidate: parseInt(process.env.FETCH_REVALIDATE_TIME)
    };
  } else {
    fetchOpts.cache = cache;
  }

  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    fetchOpts
  ).then((response) => response.json());
}

export async function getContentBlocks(type, slug) {
  const blocks = await fetchGraphQL(QUERY_CONTENT, { type, slug });
  return extractCategoryContent(blocks);
}
