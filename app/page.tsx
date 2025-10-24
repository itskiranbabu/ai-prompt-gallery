import { Search, Plus, Filter, Grid, List } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AI Prompt Gallery</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Prompt
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Grid className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Sample Prompt Cards */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-t-lg"></div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Sample Prompt {item}</h3>
                <p className="text-gray-600 text-sm mb-3">Create stunning AI art with this amazing prompt...</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">AI Art</span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}