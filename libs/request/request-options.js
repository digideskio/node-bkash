const urlTemplate = require('url-template')
const deepmerge = require('deepmerge')

const endpointDefaults = require('../defaults').ENDPOINT

const { extractUrlVariableNames } = require('./helpers')

const getRequestOptions = options => {
  options = deepmerge(endpointDefaults, options)

  let {
    baseUrl,
    body,
    headers,
    method,
    url,
    request: requestOptions,
    ...remainingOptions
  } = options

  // replace :varname with {varname} to make it RFC 6570 compatible
  url = url.replace(/:([a-z]\w+)/g, '{+$1}')

  // extract variable names from URL to calculate remaining variables later
  let urlVariableNames = extractUrlVariableNames(url)

  url = urlTemplate.parse(url).expand(remainingOptions)

  if (!/^http/.test(url)) url = `${baseUrl}${url}`

  urlVariableNames.forEach(key => {
    delete remainingOptions[key]
  })

  if (Object.keys(remainingOptions).length) body = remainingOptions

  return {
    ...requestOptions,
    method,
    url,
    headers,
    body
  }
}

module.exports = getRequestOptions
