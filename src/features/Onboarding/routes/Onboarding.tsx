import { AppLayout } from '@/components/Layout/AppLayout/AppLayout';
import { AllApplication } from '@/components/Layout/AllApplication/AllApplication';
import { Card } from '@/components/UI/Card';
import { cards } from '@/Data';

export function Onboarding() {
  return (
    <>
      <AppLayout>
        <div className="flex justify-between gap-11">
          {cards.map((card, index) => {
            return (
              <div className={`${index === 0 ? 'flex-auto' : 'flex-1'} `} key={index}>
                <Card>
                  <div className="title">{card.title}</div>
                  <div
                    className="value"
                    style={{ color: card.color, fontWeight: index === 0 ? '700' : '500' }}
                  >
                    {card.value}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* ALL APPLICATION */}

        <div className="mt-8">
          <AllApplication />
        </div>
      </AppLayout>
    </>
  );
}
