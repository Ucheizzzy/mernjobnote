export const authenticatedUser = async (req, res, next) => {
  console.log('authenticated user middleware')
  next()
}
