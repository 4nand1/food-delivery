import Image from "next/image";

export default function HeroOffer() {
  return (
    <section className="w-full overflow-hidden rounded-xl bg-[#2a2a2a]">
      <div className="mx-auto  px-4">
        <div className="relative overflow-hidden rounded-[12px] bg-zinc-900">
       
          <div className="relative h-[240px] md:h-[320px] lg:h-[360px]">
            <Image
              src="/BG.png"
              alt="Offer background"
              fill
              className="object-cover opacity-85"
              priority
            />

        
            <div className="absolute inset-0 bg-black/35" />

            
            <div className="absolute left-6 top-1/2 -translate-y-1/2 md:left-10">
              <div className="relative rounded-full bg-zinc-950/95 px-6 py-5 md:px-10 md:py-6 shadow-lg">
                <p className="text-[38px] leading-none font-extrabold tracking-tight text-white md:text-[56px]">
                  TODAY&apos;S
                </p>
                <p className="mt-2 text-[38px] leading-none font-extrabold tracking-tight text-white md:text-[56px]">
                  OFFER!
                </p>

                
                <div className="mt-4 inline-flex items-center rounded-full bg-[#FF4D2E] px-4 py-2">
                  <span className="text-xs font-bold tracking-wide text-white md:text-sm">
                    STEAK SOCIETY
                  </span>
                </div>
              </div>
            </div>

            {/* Dish image (placeholder) */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 md:right-10">
              <div className="relative h-[150px] w-[220px] md:h-[200px] md:w-[300px] lg:h-[230px] lg:w-[340px]">
                {/* Хэрвээ чи /public/offer-dish.png тавибал яг бодитоор харагдана */}
                <Image
                  src="/offer-dish.png"
                  alt="Offer dish"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Small plus icon like figma */}
            <div className="absolute right-[280px] top-[70px] hidden md:block">
              <div className="text-[#FF4D2E] text-[44px] font-black leading-none">
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
