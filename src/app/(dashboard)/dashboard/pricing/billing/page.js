import PricingBilling from "@/components/dashboard/package/PricingBilling/PricingBilling";
import { baseUrl } from "@/utils/functions/baseUrl";
import React from "react";

export const metadata = {
  title: "Billing | Infotecsourz",
  description: "Photo Retouching App",
};
const Billing = async (props) => {
  const packageId = props?.searchParams?.package;
  const getPackage = async () => {
    try {
      const res = await fetch(`${baseUrl}/package/${packageId}`, {
        cache: "no-store",
      });
      const result = await res.json();
      return result?.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "something went wrong");
    }
  };

  const pack = await getPackage();

  return (
    <div className="min-h-screen">
      <h1>Billing</h1>
      <PricingBilling pack={pack} />
    </div>
  );
};

export default Billing;
