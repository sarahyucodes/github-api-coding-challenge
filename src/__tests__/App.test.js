import { render, screen } from '../test-utils'
import App from '../App'

describe('<App />', () => {
  render(<App />)

  it('renders the header', () => {
    const headerElement = screen.getByRole('heading', { level: 1})
    expect(headerElement).toHaveTextContent(/GitHub Repositories/i)
  })
})
