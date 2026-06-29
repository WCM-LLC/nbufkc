export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SiteSettingsPartsFragmentDoc = gql`
    fragment SiteSettingsParts on SiteSettings {
  __typename
  orgName
  tagline
  logo
  address {
    __typename
    line1
    line2
    mapEmbedUrl
  }
  email
  phone
  hours
  nextForumDate
  social {
    __typename
    facebook
    instagram
  }
  donationLink
}
    `;
export const HomePartsFragmentDoc = gql`
    fragment HomeParts on Home {
  __typename
  hero {
    __typename
    heading
    subheading
    primaryCtaLabel
    primaryCtaHref
    secondaryCtaLabel
    secondaryCtaHref
    image
  }
  mission {
    __typename
    heading
    body
  }
  actionCards {
    __typename
    title
    description
    href
    ctaLabel
  }
  ourWork {
    __typename
    heading
    intro
    focusAreas {
      __typename
      title
      description
    }
  }
  upcomingForum {
    __typename
    heading
    body
  }
  contactCta {
    __typename
    heading
    body
  }
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  hero {
    __typename
    heading
    subheading
  }
  mission {
    __typename
    heading
    body
  }
  vision {
    __typename
    heading
    body
  }
  history {
    __typename
    heading
    body
  }
  whatWeDo {
    __typename
    heading
    body
    items {
      __typename
      title
      description
    }
  }
  leadership {
    __typename
    name
    role
    photo
    bio
  }
}
    `;
export const PartnerPartsFragmentDoc = gql`
    fragment PartnerParts on Partner {
  __typename
  name
  blurb
  url
  order
}
    `;
export const ResourcePartsFragmentDoc = gql`
    fragment ResourceParts on Resource {
  __typename
  title
  description
  file
  type
  order
}
    `;
export const UpdatePartsFragmentDoc = gql`
    fragment UpdateParts on Update {
  __typename
  title
  date
  draft
  excerpt
  coverImage
  body
}
    `;
export const SiteSettingsDocument = gql`
    query siteSettings($relativePath: String!) {
  siteSettings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteSettingsParts
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const SiteSettingsConnectionDocument = gql`
    query siteSettingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteSettingsFilter) {
  siteSettingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteSettingsParts
      }
    }
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const HomeDocument = gql`
    query home($relativePath: String!) {
  home(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomeParts
  }
}
    ${HomePartsFragmentDoc}`;
export const HomeConnectionDocument = gql`
    query homeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeFilter) {
  homeConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomeParts
      }
    }
  }
}
    ${HomePartsFragmentDoc}`;
export const AboutDocument = gql`
    query about($relativePath: String!) {
  about(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutParts
  }
}
    ${AboutPartsFragmentDoc}`;
export const AboutConnectionDocument = gql`
    query aboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutFilter) {
  aboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutParts
      }
    }
  }
}
    ${AboutPartsFragmentDoc}`;
export const PartnerDocument = gql`
    query partner($relativePath: String!) {
  partner(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PartnerParts
  }
}
    ${PartnerPartsFragmentDoc}`;
export const PartnerConnectionDocument = gql`
    query partnerConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PartnerFilter) {
  partnerConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PartnerParts
      }
    }
  }
}
    ${PartnerPartsFragmentDoc}`;
export const ResourceDocument = gql`
    query resource($relativePath: String!) {
  resource(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ResourceParts
  }
}
    ${ResourcePartsFragmentDoc}`;
export const ResourceConnectionDocument = gql`
    query resourceConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ResourceFilter) {
  resourceConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ResourceParts
      }
    }
  }
}
    ${ResourcePartsFragmentDoc}`;
export const UpdateDocument = gql`
    query update($relativePath: String!) {
  update(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...UpdateParts
  }
}
    ${UpdatePartsFragmentDoc}`;
export const UpdateConnectionDocument = gql`
    query updateConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: UpdateFilter) {
  updateConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...UpdateParts
      }
    }
  }
}
    ${UpdatePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    siteSettings(variables, options) {
      return requester(SiteSettingsDocument, variables, options);
    },
    siteSettingsConnection(variables, options) {
      return requester(SiteSettingsConnectionDocument, variables, options);
    },
    home(variables, options) {
      return requester(HomeDocument, variables, options);
    },
    homeConnection(variables, options) {
      return requester(HomeConnectionDocument, variables, options);
    },
    about(variables, options) {
      return requester(AboutDocument, variables, options);
    },
    aboutConnection(variables, options) {
      return requester(AboutConnectionDocument, variables, options);
    },
    partner(variables, options) {
      return requester(PartnerDocument, variables, options);
    },
    partnerConnection(variables, options) {
      return requester(PartnerConnectionDocument, variables, options);
    },
    resource(variables, options) {
      return requester(ResourceDocument, variables, options);
    },
    resourceConnection(variables, options) {
      return requester(ResourceConnectionDocument, variables, options);
    },
    update(variables, options) {
      return requester(UpdateDocument, variables, options);
    },
    updateConnection(variables, options) {
      return requester(UpdateConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
