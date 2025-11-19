import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle, Clock } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";
import pricingData from "@/data/pricing.json";

const Payment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Payment Options
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
              Choose the payment method that works best for you
            </p>
          </div>
        </section>

        {/* Payment Plans */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Payment Plans</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              {pricingData.plans.map((plan) => (
                <Card key={plan.id} className={plan.id === "term" ? "border-primary" : ""}>
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    {plan.discount && (
                      <div className="inline-block px-3 py-1 bg-success/10 text-success rounded-full text-sm font-semibold">
                        Save {plan.discount}
                      </div>
                    )}
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bank Transfer */}
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Bank Transfer Details</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-4">Bank Account Information</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
                          <p className="font-semibold">{pricingData.bankDetails.bankName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Branch</p>
                          <p className="font-semibold">{pricingData.bankDetails.branch}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Account Name</p>
                          <p className="font-semibold">{pricingData.bankDetails.accountName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Account Number</p>
                          <p className="font-semibold">{pricingData.bankDetails.accountNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Important Note</p>
                        <p className="text-sm text-muted-foreground">
                          After making the payment, please send the payment slip to our WhatsApp number 
                          with your name and class details for confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Online Payment */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Online Payment</h2>
            <div className="max-w-3xl mx-auto">
              {pricingData.onlinePayment.comingSoon ? (
                <ComingSoon />
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      Online payment integration will appear here
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
