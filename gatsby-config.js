const { sources } = require('./node-sources')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const createGatsbySourceFilesystem = () =>
  sources.map(eachSource => {
    return {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: eachSource.name,
        path: eachSource.path, // `${__dirname}/blog/development`,
      },
    }
  })

module.exports = {
  siteMetadata: {
    title: 'Crucian Carp',
    description:
      'This website is for posting articles about software engineering, politics and economy',
    author: '@aaronryu',
    siteUrl: 'https://aaronryu.github.io/',
    deployBranch: process.env.NOW_GITHUB_COMMIT_REF,
    linkGithub: 'https://github.com/aaronryu',
    linkFacebook: 'https://www.facebook.com/chungmo.ryu',
    linkTwitter: 'https://twitter.com/AaronRyu_',
  },
  plugins: [
    'gatsby-plugin-dark-mode',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-react-helmet-canonical-urls',
      options: {
        siteUrl: process.env.SITE_URL,
      },
    },
    'gatsby-plugin-sitemap',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-gtag',
    //   options: {
    //     trackingId: process.env.GA_TRACKING_ID,
    //     head: true,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `aaron.ryu`,
        short_name: `aaron`,
        start_url: `/`,
        background_color: `#2b2836`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: `#2b2836`,
        display: `minimal-ui`,
        icon: `src/images/aaron-icon-lined-static.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`${__dirname}/src/components/layout.tsx`),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        // defaultLayouts: {
        //   // File System ??? name ??? ?????? ????????? default ?????? ????????????????????????
        //   blog: require.resolve(`${__dirname}/src/components/layout.tsx`),
        //   default: require.resolve(`${__dirname}/src/components/layout.tsx`),
        // },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-code-titles',
            options: {
              className: 'your-custom-class-name',
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: `<svg height="20" viewBox="0 0 20 20" width="20" fill="var(--text-link)"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>`,
              className: 'anchor-header', // ??? class????????? ?????? ?????? ????????? ?????? ???????????? ?????? ??????????????? ??????
              maintainCase: false, // ??? ????????? ????????? false??? ??????. url??? ??????????????? ???????????? ????????? ????????? ???????????? ?????? ??? ??????.
              removeAccents: true,
              elements: ['h1', 'h2', 'h3', 'h4'], // ????????? ????????? Header ?????? ??????
              // h2, h3 ?????? CSS 'scroll-margin-top: 5rem;' ??? ???????????? ?????? ???????????? ????????? ?????? ??? ?????? ????????? ?????? ?????? ????????? ????????? ??????. (????????? ??????????????? ??????)
            },
          },
          // { resolve: 'gatsby-remark-images' },
          {
            resolve: 'gatsby-remark-prismjs',
          },
        ],
        // plugins: [{ resolve: 'gatsby-remark-images' }],
      },
    },
    ...createGatsbySourceFilesystem()
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'development',
    //     path: `${__dirname}/blog/development`,
    //   },
    // },
  ],
}
