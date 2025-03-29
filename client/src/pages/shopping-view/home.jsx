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
  },
  {
    icon: TrendingUp,
    title: "Latest Trends",
    description: "Stay ahead with our curated selection",
  },
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-white px-4"
                  >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                      Discover Amazing Products
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                      Shop the latest trends with our curated collection of premium products
                    </p>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90"
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
        className="py-12 bg-white border-b"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-4 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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
            <Badge variant="secondary" className="mb-4">Categories</Badge>
            <h2 className="text-4xl font-bold">Shop by Category</h2>
            <p className="text-gray-600 mt-2">Browse our curated collection of products</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((categoryItem) => (
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
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary group"
                >
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <categoryItem.icon className="w-16 h-16 text-primary" />
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
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">Brands</Badge>
            <h2 className="text-4xl font-bold">Shop by Brand</h2>
            <p className="text-gray-600 mt-2">Explore products from your favorite brands</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandsWithIcon.map((brandItem) => (
              <motion.div
                key={brandItem.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary group"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <brandItem.icon className="w-12 h-12 text-primary" />
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
            <Badge variant="secondary" className="mb-4">Featured</Badge>
            <h2 className="text-4xl font-bold">Featured Products</h2>
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
