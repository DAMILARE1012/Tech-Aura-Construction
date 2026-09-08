/**
 * Drops filter values that mean "no filter" so they never reach the query
 * string. Shared by every list endpoint — previously duplicated verbatim in
 * three api modules.
 */
export const cleanParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value && value !== 'All' && value !== ''),
  )
