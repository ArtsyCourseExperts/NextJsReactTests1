
//Help with Title, SEO.

import SeoHelpers from "/utils/file/seo-helpers.js"
import BrandAceHelpers from "/utils/ace/brand-ace-helpers.js"

function getPrefixedPageTitle( strPageTitle ) 
    {
    let aceBrand = BrandAceHelpers.getBrandNameNoSpaces();
    let titleFull = SeoHelpers.getSiteHyphenTitle( aceBrand, strPageTitle )
    return titleFull;
    }


module.exports = {
    getPrefixedPageTitle
    };

