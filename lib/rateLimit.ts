import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import redis from "./redis";

// Create a new ratelimiter, that allows 5 requests per 1 min
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit