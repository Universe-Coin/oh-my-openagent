import type { CSSProperties, JSX } from "react"
import { getTranslations } from "next-intl/server"

import { Reveal } from "@/components/landing/motion-wrappers"
import { SectionHeader } from "@/components/landing/section-header"
import { KIBITZER_STEP_COUNT } from "@/components/landing/story-data"
import { Frame } from "@/components/ledger/frame"
import { Chip } from "@/components/ui/badge"

const STEPS = Array.from({ length: KIBITZER_STEP_COUNT }, (_, i) => i + 1)
const NUDGE_STEP = 2

export async function KibitzerSection(): Promise<JSX.Element> {
  const t = await getTranslations("landing")

  return (
    <section
      data-section="kibitzer"
      aria-labelledby="kibitzer-title"
      className="border-line border-t py-16 lg:py-24"
    >
      <Frame>
        <Reveal>
          <SectionHeader
            id="kibitzer-title"
            eyebrow="Kibitzer"
            dot="busy"
            title={t("kibitzer.title")}
            intro={t("kibitzer.body")}
          />
        </Reveal>
        <Reveal index={1} className="mt-12">
          <div
            data-testid="kibitzer-stage"
            className="border-line bg-ink-1 grid border md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]"
          >
            <div className="border-line border-b p-5 md:border-r md:border-b-0">
              <p className="eyebrow text-text-lo">{t("kibitzer.sidecar")}</p>
              <ol className="mt-4 space-y-3">
                {STEPS.map((step) => {
                  const side = t(`kibitzer.step${step}Side`)
                  if (!side) return null
                  const style: CSSProperties & { "--i": number } = { "--i": step - 1 }
                  return (
                    <li
                      key={step}
                      style={style}
                      className="kib-step text-text-mid relative pl-4 font-mono text-[0.8125rem] leading-[1.55]"
                    >
                      <span className="text-text-faint mr-2">{t("kibitzer.memory")} ·</span>
                      {side}
                    </li>
                  )
                })}
              </ol>
            </div>
            <div className="relative p-5">
              <p className="eyebrow text-text-lo">{t("kibitzer.main")}</p>
              <ol className="mt-4 space-y-3">
                {STEPS.map((step) => {
                  const style: CSSProperties & { "--i": number } = { "--i": step - 1 }
                  return (
                    <li
                      key={step}
                      style={style}
                      className="kib-step text-text-hi relative pl-4 text-base leading-[1.6]"
                    >
                      {t(`kibitzer.step${step}Main`)}
                      {step === NUDGE_STEP ? (
                        <Chip className="kib-nudge border-accent text-accent ml-3 align-middle">
                          {t("kibitzer.nudge")} →
                        </Chip>
                      ) : null}
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </Reveal>
      </Frame>
    </section>
  )
}
