import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';
import productAPI from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import { CardSkeleton } from '../components/Loader';
import SEO from '../components/SEO';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await productAPI.getProducts({ search: query, page, limit: 12 });
        const data = res.data?.data || res.data;
        setResults(data.products || []);
        setPagination(data.pagination || null);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setPage(1);
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchParams({});
    setResults([]);
  };

  return (
    <>
      <SEO
        title={query ? `Search: ${query} | CoverGhar` : 'Search | CoverGhar'}
        description={`Search results for "${query}" - Find mobile covers for all brands at CoverGhar`}
        url={`/search?q=${encodeURIComponent(query)}`}
      />
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for mobile covers, brands, models..."
                  className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
                  autoFocus
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-14 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition"
                >
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Results Header */}
          {query && (
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {loading ? 'Searching...' : `Search results for "${query}"`}
              </h1>
              {!loading && pagination && (
                <p className="text-gray-500 mt-1">
                  {pagination.totalProducts || 0} products found
                </p>
              )}
            </div>
          )}

          {/* No Query State */}
          {!query && !loading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FiSearch className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">What are you looking for?</h2>
              <p className="text-gray-500 mb-6">Search for mobile covers by brand, model, or style</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['iPhone 15', 'Samsung S24', 'OnePlus 12', 'Anime Covers', 'Realme'].map(term => (
                  <button
                    key={term}
                    onClick={() => { setSearchInput(term); setSearchParams({ q: term }); }}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Results Grid */}
          {!loading && results.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={!pagination.hasPrev}
                    className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={!pagination.hasNext}
                    className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {!loading && query && results.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FiSearch className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
              <p className="text-gray-500 mb-6">Try a different search term or browse our categories</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/products" className="px-5 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition">
                  Browse All Products
                </Link>
                <Link to="/themes" className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                  View Themes
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
