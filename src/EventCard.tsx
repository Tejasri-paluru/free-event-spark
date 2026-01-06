import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  booked_count: number;
  category: string;
  is_featured?: boolean;
}

interface EventCardProps {
  event: Event;
  className?: string;
}

const EventCard = ({ event, className = "" }: EventCardProps) => {
  const spotsLeft = event.capacity - event.booked_count;
  const isSoldOut = spotsLeft <= 0;
  const isAlmostFull = spotsLeft > 0 && spotsLeft <= 10;

  // Format date nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link
      to={`/events/${event.id}`}
      className={`group block bg-card rounded-xl overflow-hidden border border-border card-hover ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm"
        >
          {event.category}
        </Badge>
        {/* Status Badge */}
        {isSoldOut ? (
          <Badge variant="destructive" className="absolute top-3 right-3">
            Sold Out
          </Badge>
        ) : isAlmostFull ? (
          <Badge className="absolute top-3 right-3 bg-warning text-warning-foreground">
            {spotsLeft} spots left
          </Badge>
        ) : null}
        {/* Featured Badge */}
        {event.is_featured && (
          <div className="absolute bottom-3 left-3">
            <Badge className="gradient-accent text-accent-foreground border-0">
              ⭐ Featured
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(event.date)}</span>
            <Clock className="h-4 w-4 text-primary ml-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>
              {event.booked_count} / {event.capacity} booked
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button
          variant={isSoldOut ? "secondary" : "hero"}
          className="w-full"
          disabled={isSoldOut}
        >
          {isSoldOut ? "Sold Out" : "Book Now — Free"}
        </Button>
      </div>
    </Link>
  );
};

export default EventCard;
