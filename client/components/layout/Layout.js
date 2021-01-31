import Header from './Header'

const Layout = ({ children, data }) => {
  return (
    <div>
      <Header data={data} />
      <main>{children}</main>
    </div>
  )
}
export default Layout
