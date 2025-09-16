const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author = 'Playwright Tester', url = 'http://example.com') => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByLabel('Title:').fill(title)
  await page.getByLabel('Author:').fill(author)
  await page.getByLabel('URL:').fill(url)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(title).waitFor()
}


export { loginWith, createBlog }