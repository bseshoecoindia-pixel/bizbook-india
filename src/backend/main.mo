import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import BusinessLib "lib/business";
import BusinessTypes "types/business";
import CustomerLib "lib/customer";
import CustomerTypes "types/customer";
import ProductLib "lib/product";
import ProductTypes "types/product";
import InvoiceLib "lib/invoice";
import InvoiceTypes "types/invoice";
import CommonTypes "types/common";
import BusinessApi "mixins/business-api";
import CustomerApi "mixins/customer-api";
import ProductApi "mixins/product-api";
import InvoiceApi "mixins/invoice-api";
import DashboardApi "mixins/dashboard-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Business profiles
  let businessProfiles : BusinessLib.State = Map.empty<Principal, BusinessTypes.BusinessProfile>();
  include BusinessApi(accessControlState, businessProfiles);

  // Customers
  let customers : CustomerLib.State = List.empty<CustomerTypes.Customer>();
  let nextCustomerId = { var val : Nat = 1 };
  include CustomerApi(accessControlState, customers, nextCustomerId);

  // Products
  let products : ProductLib.ProductState = List.empty<ProductTypes.Product>();
  let stockUpdates : ProductLib.StockState = List.empty<ProductTypes.StockUpdate>();
  let nextProductId = { var val : Nat = 1 };
  let nextStockUpdateId = { var val : Nat = 1 };
  include ProductApi(accessControlState, products, stockUpdates, nextProductId, nextStockUpdateId);

  // Invoices
  let invoices : InvoiceLib.State = List.empty<InvoiceTypes.Invoice>();
  let nextInvoiceId = { var val : Nat = 1 };
  include InvoiceApi(accessControlState, invoices, nextInvoiceId);

  // Dashboard
  include DashboardApi(accessControlState, invoices, products, customers);

  // Seed data flag
  var seedDone : Bool = false;

  // Seed realistic Indian business data on first call
  public func initSeedData() : async () {
    if (seedDone) return;
    seedDone := true;

    // Seed 5 products (clothing + cosmetics, INR prices in paise, 18% GST)
    // ₹499 = 49900 paise, ₹1299 = 129900 paise, etc.
    let now = Time.now();

    let p1 : ProductTypes.Product = {
      productId = nextProductId.val;
      name = "Cotton Kurti - Royal Blue";
      category = "Clothing";
      sku = "KUR-001";
      barcode = ?"8901234567890";
      purchasePrice = 39900; // ₹399
      sellingPrice = 69900; // ₹699
      quantity = 25;
      unit = "Piece";
      taxPercent = 18;
      imageUrl = null;
      supplierName = ?"Jaipur Textile Mills";
      createdAt = now;
    };
    products.add(p1);
    nextProductId.val += 1;

    let p2 : ProductTypes.Product = {
      productId = nextProductId.val;
      name = "Silk Saree - Banarasi";
      category = "Clothing";
      sku = "SAR-001";
      barcode = ?"8901234567891";
      purchasePrice = 249900; // ₹2499
      sellingPrice = 449900; // ₹4499
      quantity = 8;
      unit = "Piece";
      taxPercent = 18;
      imageUrl = null;
      supplierName = ?"Varanasi Silk House";
      createdAt = now;
    };
    products.add(p2);
    nextProductId.val += 1;

    let p3 : ProductTypes.Product = {
      productId = nextProductId.val;
      name = "Men's Formal Shirt - White";
      category = "Clothing";
      sku = "SHT-001";
      barcode = ?"8901234567892";
      purchasePrice = 59900; // ₹599
      sellingPrice = 99900; // ₹999
      quantity = 3; // low stock
      unit = "Piece";
      taxPercent = 18;
      imageUrl = null;
      supplierName = ?"Mumbai Garments Co";
      createdAt = now;
    };
    products.add(p3);
    nextProductId.val += 1;

    let p4 : ProductTypes.Product = {
      productId = nextProductId.val;
      name = "Lakme Foundation - Beige";
      category = "Cosmetics";
      sku = "COS-001";
      barcode = ?"8901234567893";
      purchasePrice = 34900; // ₹349
      sellingPrice = 54900; // ₹549
      quantity = 2; // low stock
      unit = "Piece";
      taxPercent = 18;
      imageUrl = null;
      supplierName = ?"Lakme Distributors Delhi";
      createdAt = now;
    };
    products.add(p4);
    nextProductId.val += 1;

    let p5 : ProductTypes.Product = {
      productId = nextProductId.val;
      name = "Himalaya Face Wash - Neem";
      category = "Cosmetics";
      sku = "COS-002";
      barcode = ?"8901234567894";
      purchasePrice = 9900; // ₹99
      sellingPrice = 14900; // ₹149
      quantity = 40;
      unit = "Piece";
      taxPercent = 18;
      imageUrl = null;
      supplierName = ?"Himalaya Wholesale Hub";
      createdAt = now;
    };
    products.add(p5);
    nextProductId.val += 1;

    // Seed 3 customers (Indian names)
    let c1 : CustomerTypes.Customer = {
      customerId = nextCustomerId.val;
      name = "Priya Sharma";
      phone = "9876543210";
      email = ?"priya.sharma@gmail.com";
      address = ?"42, Lajpat Nagar, New Delhi - 110024";
      gstNumber = null;
      totalPurchaseAmount = 519800; // ₹5198
      pendingAmount = 0;
      createdAt = now;
    };
    customers.add(c1);
    nextCustomerId.val += 1;

    let c2 : CustomerTypes.Customer = {
      customerId = nextCustomerId.val;
      name = "Rajesh Gupta";
      phone = "9845012345";
      email = ?"rajesh.gupta@yahoo.com";
      address = ?"15, MG Road, Bangalore - 560001";
      gstNumber = ?"29AABCU9603R1ZX";
      totalPurchaseAmount = 449900; // ₹4499
      pendingAmount = 449900; // outstanding
      createdAt = now;
    };
    customers.add(c2);
    nextCustomerId.val += 1;

    let c3 : CustomerTypes.Customer = {
      customerId = nextCustomerId.val;
      name = "Anita Patel";
      phone = "9765432109";
      email = ?"anita.patel@hotmail.com";
      address = ?"7, CG Road, Ahmedabad - 380009";
      gstNumber = null;
      totalPurchaseAmount = 99900; // ₹999
      pendingAmount = 0;
      createdAt = now;
    };
    customers.add(c3);
    nextCustomerId.val += 1;

    // Seed 3 invoices (Draft, Sent, Paid)
    // Invoice 1: Paid — Priya Sharma bought Cotton Kurti + Face Wash
    let inv1Items : [InvoiceTypes.InvoiceItem] = [
      {
        productId = ?1;
        productName = "Cotton Kurti - Royal Blue";
        quantity = 2;
        unitPrice = 69900;
        discount = 0;
        taxPercent = 18;
        lineTotal = 139800; // 2 * 69900
      },
      {
        productId = ?5;
        productName = "Himalaya Face Wash - Neem";
        quantity = 4;
        unitPrice = 14900;
        discount = 0;
        taxPercent = 18;
        lineTotal = 59600; // 4 * 14900
      },
    ];
    let inv1Subtotal : Nat = 139800 + 59600; // 199400
    let inv1Tax : Nat = inv1Subtotal * 9 / 100; // 9% CGST + 9% SGST each = 18% split
    let inv1 : InvoiceTypes.Invoice = {
      invoiceId = nextInvoiceId.val;
      invoiceNumber = InvoiceLib.generateInvoiceNumber(nextInvoiceId.val);
      customerId = ?1;
      customerName = "Priya Sharma";
      customerPhone = "9876543210";
      items = inv1Items;
      subtotal = inv1Subtotal;
      cgst = inv1Tax;
      sgst = inv1Tax;
      discount = 0;
      total = inv1Subtotal + inv1Tax + inv1Tax; // 199400 + 17946 + 17946 = 235292
      notes = ?"Thank you for your purchase!";
      dueDate = null;
      paymentStatus = #Paid;
      status = #Paid;
      createdAt = now - (2 * 86_400_000_000_000); // 2 days ago
      updatedAt = now - (1 * 86_400_000_000_000); // updated yesterday
    };
    invoices.add(inv1);
    nextInvoiceId.val += 1;

    // Invoice 2: Sent — Rajesh Gupta bought Banarasi Saree (outstanding)
    let inv2Items : [InvoiceTypes.InvoiceItem] = [
      {
        productId = ?2;
        productName = "Silk Saree - Banarasi";
        quantity = 1;
        unitPrice = 449900;
        discount = 0;
        taxPercent = 18;
        lineTotal = 449900;
      },
    ];
    let inv2Subtotal : Nat = 449900;
    let inv2Tax : Nat = inv2Subtotal * 9 / 100;
    let inv2 : InvoiceTypes.Invoice = {
      invoiceId = nextInvoiceId.val;
      invoiceNumber = InvoiceLib.generateInvoiceNumber(nextInvoiceId.val);
      customerId = ?2;
      customerName = "Rajesh Gupta";
      customerPhone = "9845012345";
      items = inv2Items;
      subtotal = inv2Subtotal;
      cgst = inv2Tax;
      sgst = inv2Tax;
      discount = 0;
      total = inv2Subtotal + inv2Tax + inv2Tax;
      notes = ?"GST Invoice - B2B";
      dueDate = ?(now + (7 * 86_400_000_000_000)); // due in 7 days
      paymentStatus = #Unpaid;
      status = #Sent;
      createdAt = now - (1 * 86_400_000_000_000); // yesterday
      updatedAt = now - (1 * 86_400_000_000_000);
    };
    invoices.add(inv2);
    nextInvoiceId.val += 1;

    // Invoice 3: Draft — Anita Patel, Men's Formal Shirt
    let inv3Items : [InvoiceTypes.InvoiceItem] = [
      {
        productId = ?3;
        productName = "Men's Formal Shirt - White";
        quantity = 1;
        unitPrice = 99900;
        discount = 500; // ₹5 discount
        taxPercent = 18;
        lineTotal = 99400;
      },
    ];
    let inv3Subtotal : Nat = 99400;
    let inv3Tax : Nat = inv3Subtotal * 9 / 100;
    let inv3 : InvoiceTypes.Invoice = {
      invoiceId = nextInvoiceId.val;
      invoiceNumber = InvoiceLib.generateInvoiceNumber(nextInvoiceId.val);
      customerId = ?3;
      customerName = "Anita Patel";
      customerPhone = "9765432109";
      items = inv3Items;
      subtotal = inv3Subtotal;
      cgst = inv3Tax;
      sgst = inv3Tax;
      discount = 500;
      total = inv3Subtotal + inv3Tax + inv3Tax;
      notes = null;
      dueDate = null;
      paymentStatus = #Unpaid;
      status = #Draft;
      createdAt = now;
      updatedAt = now;
    };
    invoices.add(inv3);
    nextInvoiceId.val += 1;
  };
};
