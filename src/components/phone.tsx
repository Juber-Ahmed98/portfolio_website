/**
 * A phone made of DOM: dark body, a rim catching lamp light from the upper
 * left, side keys, an inset screen with a punch-hole camera. All of it scales
 * with the wrapper's width (container units), so one component serves the
 * 230px phone in a client row and the 380px one in the film. Styles live in
 * globals.css under "The phone".
 *
 * `screenClassName` lets a caller turn the screen into a size container (the
 * client rows do, so a full-page capture can pan inside it).
 */
export function Phone({
  children,
  className = "",
  screenClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div className={`phone-wrap ${className}`}>
      <div className="phone">
        <div className={`phone-screen ${screenClassName}`}>
          {children}
          <span className="phone-cam" aria-hidden />
        </div>
      </div>
    </div>
  );
}
