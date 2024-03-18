export const formatExcel = (data) => {
  const customHeaders = [
    { label: "Bill No", key: "Bill No" },
    { label: "Name", key: "Name" },
    { label: "customer Id", key: "customer Id" },
    { label: "Date", key: "Date" },
    { label: "Total Bags", key: "Total Bags" },
    { label: "Bill Amount", key: "Bill Amount" },
    { label: "Mahaveer Code", key: "Mahaveer Code" },
    { label: "Payment Method", key: "Payment Method" },
  ];
  const fromatExcelData = data.map((order) => {
    let customOrder = [
      "Bill No",
      "Name",
      "customer Id",
      "Date",
      "Total Bags",
      "Bill Amount",
      "Mahaveer Code",
      "Payment Method",
    ];
    let newOrder = {};

    //    customOrder.forEach((key)=>{
    //     newOrder[key] = order[key]
    //    })
    newOrder["Bill No"] = order.billNo;
    newOrder["Name"] = order.name;
    newOrder["customer Id"] = order.customerId;
    newOrder["Date"] = order.createdAt;
    newOrder["Total Bags"] = order.totalBags;
    newOrder["Bill Amount"] = order.totalAmount;
    newOrder["Mahaveer Code"] = order.location;
    newOrder["Payment Method"] = order.paymentMethod;
    return newOrder;
  });
  return { fromatExcelData, customHeaders };
};
