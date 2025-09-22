import PropTypes from "prop-types";
import { motion } from "framer-motion";
import StatsSkeleton from "../../../components/Skeletons/stats-skeleton";
import { miniName, formatText } from "../../../../utils/utils";
import CustomTooltip from "../../../components/CustomTooltip";

// Variants for staggered block animation
const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // delay between blocks
    },
  },
};

const block = {
  hidden: { opacity: 0, scaleY: 0 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

export default function Stats({ currentPokemon, isLoading }) {
  return (
    <div className="flex p-4 items-end gap-4 min-h-60">
      {isLoading ? (
        currentPokemon?.stats?.map((stat) => (
          <CustomTooltip message={formatText(stat.name)} key={stat.name}>
            <div className="text-card flex flex-col gap-2 cursor-pointer">
              <motion.div
                className="stat-bar flex flex-col-reverse justify-center items-center gap-1"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {/* Animate each block one by one */}
                {Array.from({ length: Math.floor(stat.base_stat / 10) }).map(
                  (_, index) => (
                    <motion.div
                      key={index}
                      variants={block}
                      className="bg-card-border w-10 h-2 opacity-80 origin-bottom"
                    />
                  )
                )}
                <span>{stat.base_stat}</span>
              </motion.div>
              <div className="uppercase text-xs text-center">
                {miniName(stat.name)}
              </div>
            </div>
          </CustomTooltip>
        ))
      ) : (
        <StatsSkeleton />
      )}
    </div>
  );
}

Stats.propTypes = {
  currentPokemon: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};
