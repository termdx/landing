import { Fragment } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Reveal from "./motion/Reveal";
import type { Flow, FlowNode } from "@/lib/products";

/**
 * The product loop, drawn in boxes rather than box-drawing characters. The
 * ASCII original relied on glyph widths lining up, which only held in one font
 * at one size; this version reflows instead of breaking.
 */

function Node({ node }: { node: FlowNode }) {
  return (
    <span
      className={`inline-flex flex-col rounded-lg border bg-surface px-3.5 py-2.5 ${
        node.accent ? "border-[color:var(--td-accent)]" : "border-line"
      }`}
    >
      <span className="font-mono text-[13.5px] leading-tight text-ink">
        {node.label}
      </span>
      {node.detail ? (
        <span
          className={`mt-1 text-[11.5px] leading-tight ${
            node.accent ? "text-[color:var(--td-accent)]" : "text-faint"
          }`}
        >
          {node.detail}
        </span>
      ) : null}
    </span>
  );
}

/** One left-to-right run of nodes. Wraps rather than scrolling on a phone. */
function Chain({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
      {nodes.map((node, index) => (
        <Fragment key={node.label}>
          {index > 0 ? (
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-line-hover"
              strokeWidth={1.75}
            />
          ) : null}
          <Node node={node} />
        </Fragment>
      ))}
    </div>
  );
}

/** Vertical hop between rows. 52px wide so its line lands on x = 26px, which
    is where the branch rail below picks it up. */
function Trunk() {
  return (
    <div
      aria-hidden="true"
      className="flex w-[52px] shrink-0 flex-col items-center"
    >
      <span className="h-7 w-px bg-line-strong" />
      <ChevronDown
        className="-mt-[5px] h-3.5 w-3.5 text-line-hover"
        strokeWidth={2}
      />
    </div>
  );
}

export default function FlowDiagram({ flow }: { flow: Flow }) {
  // Branch rows are the fan-out at the end; everything else is the spine.
  const spine = flow.rows.filter((row) => !row.branch);
  const branches = flow.rows.filter((row) => row.branch);

  return (
    <figure className="m-0 rounded-xl border border-line bg-bg px-6 py-8 sm:px-9">
      <div className="flex flex-col">
        {/* Rows arrive in reading order, which is also the order the signal
            travels — the stagger is the point, not decoration. */}
        {spine.map((row, index) => (
          <Fragment key={row.nodes[0].label}>
            {index > 0 ? <Trunk /> : null}
            <Reveal delay={index * 0.1}>
              <Chain nodes={row.nodes} />
            </Reveal>
          </Fragment>
        ))}

        {branches.length > 0 ? (
          <>
            <Trunk />
            <div className="ml-[26px] flex flex-col">
              {branches.map((row, index) => (
                <div key={row.nodes[0].label} className="flex items-stretch">
                  {/* ├ / └ elbow: the top half turns into the row, the bottom
                      half carries the trunk on to the next branch. */}
                  <div
                    aria-hidden="true"
                    className="flex w-[38px] shrink-0 flex-col"
                  >
                    <span className="flex-1 rounded-bl-[6px] border-b border-l border-line-strong" />
                    <span
                      className={`flex-1 ${
                        index < branches.length - 1
                          ? "border-l border-line-strong"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="py-2.5 pl-2">
                    <Reveal delay={0.2 + index * 0.1}>
                      <Chain nodes={row.nodes} />
                    </Reveal>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>

      {flow.caption ? (
        <figcaption className="mt-8 max-w-[640px] text-[14.5px] leading-[1.65] text-muted text-pretty">
          {flow.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
