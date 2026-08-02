const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/place/Luminous+Engineering+Pte.+Ltd./@1.3109063,103.8533834,17z/data=!3m1!4b1!4m6!3m5!1s0x2527d4914833582b:0x4f377e9267003f56!8m2!3d1.3109063!4d103.8533834!16s%2Fg%2F11yv_7p0r0";

export default function GoogleReviewBadge() {
  return (
    <div className="global-google-review-badge-slot">
      <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="google-review-badge">
        <div className="google-review-top">
          <svg viewBox="0 0 24 24" width="24" height="24" className="google-g-icon">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            ></path>
          </svg>

          <span className="google-review-title">Excellent on Google</span>
        </div>

        <div className="google-review-bottom">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#FBBC05">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>

          <span className="google-review-score">5.0 out of 5</span>
        </div>
      </a>
    </div>
  );
}
