import { Button } from "@/components/ui/button";
import { Apple } from "lucide-react";
import {
  TabletSmartphone,
  PcCase,
  Laptop,
  Smartphone,
  Airplay,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  ShoppingBasket,
  WashingMachine,
  WatchIcon,
  ArrowRight,
  Star,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import LoginPromptDialog from "@/components/shopping-view/login-prompt-dialog";
import { getFeatureImages } from "@/store/common-slice";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const categoriesWithIcon = [
  { id: "phones", label: "Phones", icon: Smartphone },
  { id: "mac", label: "Laptops/Mac", icon: Laptop },
  { id: "Ipads", label: "Ipads/Tablets", icon: TabletSmartphone },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "Cases", label: "Cases", icon: PcCase },
];

const brandsWithIcon = [
  { id: "apple", label: "Apple", icon: Apple },
  { id: "samsung", label: "Samsung", icon: WashingMachine },
  { id: "google", label: "Google", icon: ShoppingBasket },
  { id: "levi", label: "others", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const features = [
  {
    icon: Star,
    title: "Premium Quality",
    description: "Top-tier products from trusted brands",
    color: "from-purple-600 to-purple-800",
  },
  {
    icon: TrendingUp,
    title: "Latest Trends",
    description: "Stay ahead with our curated selection",
    color: "from-yellow-500 to-yellow-600",
  },
];

const categoryColors = [
  "from-purple-600 to-purple-800",
  "from-yellow-500 to-yellow-600",
  "from-purple-500 to-purple-700",
  "from-yellow-400 to-yellow-500",
  "from-purple-400 to-purple-600",
];

const brandColors = [
  "from-purple-600 to-purple-800",
  "from-yellow-500 to-yellow-600",
  "from-purple-500 to-purple-700",
  "from-yellow-400 to-yellow-500",
  "from-purple-400 to-purple-600",
  "from-yellow-300 to-yellow-400",
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openLoginPrompt, setOpenLoginPrompt] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user) {
      setOpenLoginPrompt(true);
      return;
    }

    dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  //console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[80vh] overflow-hidden"
      >
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={slide?.image}
                  className="w-full h-full object-cover"
                  alt={`Slide ${index + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-white px-4"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mb-8"
                    >
                      <img 
                        src="/logo.svg" 
                        alt="iTraders Logo" 
                        className="h-16 md:h-24 w-auto mx-auto"
                      />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white">
                      Discover Amazing Products
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-100">
                      Shop the latest trends with our curated collection of premium products
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => navigate("/listing")}
                    >
                      Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))
          : null}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2"
        >
          {featureImageList?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 left-4 transform -translate-y-1/2"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) =>
                  (prevSlide - 1 + featureImageList.length) %
                  featureImageList.length
              )
            }
            className="bg-white/90 hover:bg-white transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % featureImageList.length
              )
            }
            className="bg-white/90 hover:bg-white transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-12 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r p-[2px] hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4 p-6 rounded-xl bg-white">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${feature.color} text-white`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">Categories</Badge>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">Shop by Category</h2>
            <p className="text-gray-600 mt-2">Browse our curated collection of products</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((categoryItem, index) => (
              <motion.div
                key={categoryItem.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  onClick={() =>
                    handleNavigateToListingPage(categoryItem, "category")
                  }
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-600 group overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <CardContent className="relative flex flex-col items-center justify-center p-8">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${categoryColors[index]} text-white group-hover:scale-110 transition-transform duration-300`}>
                      <categoryItem.icon className="w-16 h-16" />
                    </div>
                    <span className="font-semibold text-lg mt-4">{categoryItem.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Brands Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Brands</Badge>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">Shop by Brand</h2>
            <p className="text-gray-600 mt-2">Explore products from your favorite brands</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandsWithIcon.map((brandItem, index) => (
              <motion.div
                key={brandItem.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-yellow-500 group overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${brandColors[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <CardContent className="relative flex flex-col items-center justify-center p-6">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${brandColors[index]} text-white group-hover:scale-110 transition-transform duration-300`}>
                      <brandItem.icon className="w-12 h-12" />
                    </div>
                    <span className="font-semibold text-lg mt-4">{brandItem.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">Featured</Badge>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">Featured Products</h2>
            <p className="text-gray-600 mt-2">Discover our handpicked selection of premium products</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <motion.div
                    key={productItem.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </motion.div>
                ))
              : null}
          </div>
        </div>
      </motion.section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      
      <LoginPromptDialog 
        open={openLoginPrompt}
        setOpen={setOpenLoginPrompt}
      />
    </div>
  );
}

export default ShoppingHome;
