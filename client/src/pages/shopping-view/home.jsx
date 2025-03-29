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
        className="relative w-full h-[70vh] overflow-hidden"
      >
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <motion.img
                key={index}
                src={slide?.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            ))
          : null}
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
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
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 hover:bg-white transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % featureImageList.length
              )
            }
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 hover:bg-white transition-colors"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Categories Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-12"
          >
            Shop by Category
          </motion.h2>
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
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary"
                >
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <categoryItem.icon className="w-16 h-16 mb-4 text-primary" />
                    <span className="font-semibold text-lg">{categoryItem.label}</span>
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
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-12"
          >
            Shop by Brand
          </motion.h2>
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
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-semibold text-lg">{brandItem.label}</span>
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
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-12"
          >
            Featured Products
          </motion.h2>
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
