export interface FilterInterface {
  id: number
  value: string
}

interface DashboardContextInterface {
  regionFilters: FilterInterface[] | []
  setRegionFilters(regionFilters: FilterInterface[] | []): void
  themeFilters: FilterInterface[] | []
  setThemeFilters(themeFilters: FilterInterface[] | []): void
}

export default DashboardContextInterface
