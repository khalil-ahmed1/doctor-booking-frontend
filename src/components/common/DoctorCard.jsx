import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin, Briefcase, IndianRupee, ArrowRight } from "lucide-react";

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="group overflow-hidden rounded-3xl border-border/50 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center gap-5 mb-6">
          <Avatar className="h-16 w-16 border-2 border-primary/10 shadow-sm">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${doctor.name}`} alt={doctor.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">{doctor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{doctor.name}</h2>
            <p className="text-primary font-medium text-sm mt-0.5">{doctor.specialization}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="bg-muted p-1.5 rounded-full"><MapPin className="w-4 h-4 text-primary/70" /></div>
            <span>{doctor.clinicAddress}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-muted p-1.5 rounded-full"><Briefcase className="w-4 h-4 text-primary/70" /></div>
            <span>{doctor.experience} Years Experience</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-muted p-1.5 rounded-full"><IndianRupee className="w-4 h-4 text-primary/70" /></div>
            <span className="font-semibold text-foreground">₹{doctor.consultationFee} <span className="text-muted-foreground font-normal">consultation</span></span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {doctor.homeVisitAvailable && (
            <Badge variant="secondary" className="bg-emerald-100/50 text-emerald-700 hover:bg-emerald-100/80 border-emerald-200">
              Home Visit
            </Badge>
          )}

          {doctor.premiumBookingEnabled && (
            <Badge variant="secondary" className="bg-blue-100/50 text-blue-700 hover:bg-blue-100/80 border-blue-200">
              Premium
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto">
        <Link to={`/doctor/${doctor._id}`} className="w-full">
          <Button className="w-full rounded-xl group/btn" variant="default">
            <span>View Profile</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
