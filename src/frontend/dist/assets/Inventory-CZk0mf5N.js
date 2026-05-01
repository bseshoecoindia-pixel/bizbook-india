import { r as reactExports, j as jsxRuntimeExports, A as useId, D as Primitive, E as composeEventHandlers, G as createContextScope, H as useComposedRefs, J as useControllableState, K as useCallbackRef, M as Presence, d as cn, m as useProducts, s as Search, B as Button, L as Link, p as Plus, S as Skeleton, P as Package, X } from "./index-BOl89Uzk.js";
import { B as Badge } from "./badge-BaYXkJRd.js";
import { C as Card } from "./card-CX7VVhkd.js";
import { I as Input } from "./input-B5w0Q6J7.js";
import { c as createCollection, u as useDirection } from "./index-Aw0u7M1h.js";
import { u as useQRScanner, C as CameraOff } from "./useQRScanner-DpW2JXGD.js";
import { C as Camera } from "./camera-DE1VYTRZ.js";
import { T as TriangleAlert } from "./triangle-alert-DoJHDHUy.js";
import { C as ChevronRight } from "./chevron-right-0zun3EdD.js";
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function formatINR(paise) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(paise) / 100
  );
}
function getStockStatus(qty) {
  if (qty <= BigInt(0)) return "out_of_stock";
  if (qty <= BigInt(5)) return "low_stock";
  return "in_stock";
}
function StockBadge({ qty }) {
  const status = getStockStatus(qty);
  if (status === "in_stock")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50 text-[10px] px-1.5 py-0.5 font-medium", children: "In Stock" });
  if (status === "low_stock")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 text-[10px] px-1.5 py-0.5 font-medium", children: "Low Stock" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50 text-[10px] px-1.5 py-0.5 font-medium", children: "Out of Stock" });
}
const PLACEHOLDER_PRODUCTS = [
  {
    productId: BigInt(1),
    name: "Raymond Suit Fabric (3m)",
    sku: "CLT-001",
    category: "Clothing",
    purchasePrice: BigInt(18e4),
    sellingPrice: BigInt(245e3),
    quantity: BigInt(22),
    unit: "Pcs",
    taxPercent: BigInt(12),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(2),
    name: "Everest Garam Masala (100g)",
    sku: "SPC-001",
    category: "Food & Spices",
    purchasePrice: BigInt(4500),
    sellingPrice: BigInt(6500),
    quantity: BigInt(3),
    unit: "Pcs",
    taxPercent: BigInt(5),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(3),
    name: "Lakme 9to5 Lipstick",
    sku: "CSM-001",
    category: "Cosmetics",
    purchasePrice: BigInt(37e3),
    sellingPrice: BigInt(49900),
    quantity: BigInt(0),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(4),
    name: "boAt Airdopes 141 TWS",
    sku: "ELC-001",
    category: "Electronics",
    purchasePrice: BigInt(119900),
    sellingPrice: BigInt(149900),
    quantity: BigInt(14),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(5),
    name: "Fabindia Kurta (XL)",
    sku: "CLT-002",
    category: "Clothing",
    purchasePrice: BigInt(89e3),
    sellingPrice: BigInt(119500),
    quantity: BigInt(4),
    unit: "Pcs",
    taxPercent: BigInt(12),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(6),
    name: "MDH Sabzi Masala (500g)",
    sku: "SPC-002",
    category: "Food & Spices",
    purchasePrice: BigInt(8500),
    sellingPrice: BigInt(12e3),
    quantity: BigInt(31),
    unit: "Pcs",
    taxPercent: BigInt(5),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(7),
    name: "Biotique Bio Honey Gel",
    sku: "CSM-002",
    category: "Cosmetics",
    purchasePrice: BigInt(14e3),
    sellingPrice: BigInt(18900),
    quantity: BigInt(2),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  },
  {
    productId: BigInt(8),
    name: "Realme Buds Air 3",
    sku: "ELC-002",
    category: "Electronics",
    purchasePrice: BigInt(159900),
    sellingPrice: BigInt(199900),
    quantity: BigInt(9),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1e6)
  }
];
function StatCard({
  label,
  value,
  iconClass
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex-1 p-3 rounded-2xl border-0 shadow-card bg-card min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm font-bold truncate", iconClass), children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: label })
  ] });
}
function BarcodeScannerModal({
  onClose,
  onScan
}) {
  const {
    qrResults,
    isActive,
    error,
    isLoading,
    canStartScanning,
    startScanning,
    stopScanning,
    videoRef,
    canvasRef
  } = useQRScanner({ facingMode: "environment", scanInterval: 100 });
  const handleUse = () => {
    if (qrResults.length > 0) {
      onScan(qrResults[0].data);
      onClose();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4",
      "data-ocid": "inventory.scanner_modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[400px] bg-card rounded-2xl overflow-hidden shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Scan Barcode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "w-7 h-7 rounded-full bg-muted flex items-center justify-center",
              "data-ocid": "inventory.scanner_close_button",
              "aria-label": "Close scanner",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-black aspect-square", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              ref: videoRef,
              style: { width: "100%", height: "100%", objectFit: "cover" },
              playsInline: true,
              muted: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, style: { display: "none" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-48 border-2 border-primary rounded-xl opacity-80" }) }),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white", children: "Starting camera..." }) }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/70 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400 text-center", children: typeof error === "string" ? error : "Camera error occurred" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          qrResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 border border-green-200 rounded-xl px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-700 font-medium truncate", children: [
            "✓ ",
            qrResults[0].data
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            !isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 rounded-xl",
                onClick: startScanning,
                disabled: !canStartScanning,
                "data-ocid": "inventory.scanner_start_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 15, className: "mr-1.5" }),
                  "Start Scanning"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "flex-1 rounded-xl",
                onClick: stopScanning,
                "data-ocid": "inventory.scanner_stop_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CameraOff, { size: 15, className: "mr-1.5" }),
                  "Stop"
                ]
              }
            ),
            qrResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 rounded-xl",
                onClick: handleUse,
                "data-ocid": "inventory.scanner_confirm_button",
                children: "Use Code"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function Inventory() {
  const [search, setSearch] = reactExports.useState("");
  const [tab, setTab] = reactExports.useState("all");
  const [scannerOpen, setScannerOpen] = reactExports.useState(false);
  const { data, isLoading } = useProducts();
  const products = (data == null ? void 0 : data.items) ?? PLACEHOLDER_PRODUCTS;
  const totalProducts = products.length;
  const outOfStock = products.filter((p) => p.quantity <= BigInt(0)).length;
  const lowStock = products.filter(
    (p) => p.quantity > BigInt(0) && p.quantity <= BigInt(5)
  ).length;
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.sellingPrice * p.quantity,
    BigInt(0)
  );
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const status = getStockStatus(p.quantity);
    const matchTab = tab === "all" || tab === "in_stock" && status === "in_stock" || tab === "low_stock" && status === "low_stock" || tab === "out_of_stock" && status === "out_of_stock";
    return matchSearch && matchTab;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-4", "data-ocid": "inventory.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 grid grid-cols-4 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total",
          value: totalProducts.toString(),
          iconClass: "text-foreground"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Out of Stock",
          value: outOfStock.toString(),
          iconClass: "text-red-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Low Stock",
          value: lowStock.toString(),
          iconClass: "text-amber-600"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Value",
          value: `₹${formatINR(inventoryValue)}`,
          iconClass: "text-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-30 bg-background/95 backdrop-blur-sm px-4 pt-1 pb-2 border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 16,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search products, SKU...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 h-10 rounded-xl bg-muted border-0",
            "data-ocid": "inventory.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setScannerOpen(true),
          className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-smooth hover:bg-primary/20",
          "data-ocid": "inventory.scan_barcode_button",
          "aria-label": "Scan barcode",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 18, className: "text-primary" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: tab, onValueChange: setTab, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "w-full rounded-xl bg-muted h-9", children: [
      { value: "all", label: "All" },
      { value: "in_stock", label: "In Stock" },
      { value: "low_stock", label: "Low" },
      { value: "out_of_stock", label: "Out" }
    ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsTrigger,
      {
        value: t.value,
        className: "flex-1 rounded-lg text-xs",
        "data-ocid": `inventory.${t.value}_tab`,
        children: t.label
      },
      t.value
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        filtered.length,
        " product",
        filtered.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-8 rounded-xl text-xs gap-1", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/inventory/new", "data-ocid": "inventory.add_product_button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
        " Add Product"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 space-y-2", children: isLoading ? Array.from({ length: 5 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, i)
    )) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "p-8 text-center shadow-card rounded-2xl border-0 bg-card",
        "data-ocid": "inventory.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Package,
            {
              size: 32,
              className: "text-muted-foreground mx-auto mb-2 opacity-40"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No products found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "mt-3 rounded-xl", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/inventory/new", children: "Add Product" }) })
        ]
      }
    ) : filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden",
        "data-ocid": `inventory.product_item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/inventory/$id",
            params: { id: product.productId.toString() },
            className: "flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden", children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 18, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate leading-tight", children: product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
                  product.sku,
                  " · ",
                  product.category
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    product.quantity.toString(),
                    " ",
                    product.unit
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StockBadge, { qty: product.quantity }),
                  getStockStatus(product.quantity) === "low_stock" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12, className: "text-amber-500" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
                  "₹",
                  formatINR(product.sellingPrice)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                  "per ",
                  product.unit
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronRight,
                {
                  size: 16,
                  className: "text-muted-foreground ml-1 shrink-0"
                }
              )
            ]
          }
        )
      },
      product.productId.toString()
    )) }),
    scannerOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      BarcodeScannerModal,
      {
        onClose: () => setScannerOpen(false),
        onScan: (code) => setSearch(code)
      }
    )
  ] });
}
export {
  Inventory as default
};
